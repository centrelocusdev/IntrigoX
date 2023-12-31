const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");
const User = require("../models/User");
const FacebookUser = require("../models/FacebookUser");
const UserRegistration = require("../models/UserRegistration");
var bcrypt = require("bcryptjs");
require("dotenv").config();
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const axios = require("axios");
const fetch = require("node-fetch");
const jwksClient = require("jwks-rsa");
const jwt = require("jsonwebtoken");

const OTP_CONFIG = {
  upperCaseAlphabets: false,
  lowerCaseAlphabets: false,
  specialChars: false,
};
const generateOTP = () => {
  const OTP = otpGenerator.generate(5, OTP_CONFIG);
  return OTP;
};

//get user by email
const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

// OTP send to the email id
const otpSendToEmailId = async (subject, otp, email) => {
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });
    var mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: subject,
      text: `Here is the OTP ${otp}.`,
    };
    return { transporter, mailOptions };
  } catch (err) {
    console.log("Error", err.message);
  }
};
// Hash the password
const generateHashedPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) reject(err);
        resolve(hash);
      });
    });

    return hashedPassword;
  } catch (err) {
    console.log(err.message);
  }
};

// REGISTRATION
const register1 = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const myLanguage = req.body.myLanguage;
    const username = req.body.username;

    if (!email || !password || !myLanguage || !username) {
      throw new Error(
        "Email, Password my language and username are compulsory fields!"
      );
      return;
    }
    // If account with received email id already exists so return error message.
    const user = await User.findOne({ email });
    if (user && user.authType === "Email") {
      throw new Error("User is already exist with the given email id!");
      return;
    } else if (user && user.authType !== "Email") {
      throw new Error("Someone else is using this email!");
      return;
    }

    const userWithOtp = await UserRegistration({ email });
    if (userWithOtp) {
      await UserRegistration.deleteOne({ email });
    }
    // OTP Ceation
    const otp = generateOTP();
    // Data saved to DB
    const hashedPassword = await generateHashedPassword(password);

    const savedUser = new UserRegistration({
      username,
      email,
      password: hashedPassword,
      myLanguage,
      otp: otp,
    });
    await savedUser.save();

    // OTP send to email id
    const mailData = await otpSendToEmailId("Registration OTP", otp, email);

    mailData.transporter.sendMail(
      mailData.mailOptions,
      async function (error, info) {
        if (error) {
          console.log(error);
          throw new Error(
            "Something went wrong in otp sending to the email id."
          );
        } else {
          res.status(200).json({
            status: "success",
            message: "Otp has been sent to the given email id!",
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err.message,
    });
  }
};

const register2 = async (req, res) => {
  try {
    const otp = req.body.otp;
    if (!otp) {
      throw new Error("Kindly provide an otp!");
    }

    const userData = await UserRegistration.findOne({
      otp,
    });
    if (!userData) {
      throw new Error("OTP mismatch!");
    }
    if (userData.otp !== otp) {
      throw new Error("Invalid OTP!");
    }

    const newUser = new User({
      username: userData.username,
      email: userData.email,
      password: userData.password,
      myLanguage: userData.myLanguage,
      level: "Beginner",
      authType: "Email",
    });

    await UserRegistration.deleteOne({ _id: userData.id });

    await newUser.generateAuthToken();
    await newUser.save();
    newUser.password = undefined;
    res.status(200).json({
      status: "success",
      message: "Signup successful!",
      data: newUser,
      image: [
        `https://intrigox-userprofilepictures.s3.ap-south-1.amazonaws.com/${newUser.avatar}`,
      ],
    });
  } catch (err) {
    res.status(400).send({ status: "error", message: err.message });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("kindly provide email and pasword");
    }
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found, please sign up first!");
    if (user.authType !== "Email") {
      throw new Error("No account found, kindly register first!");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      throw new Error("Incorrect Password, Please write correct password");
    await user.generateAuthToken();
    await user.save();
    req.user = user;
    // user.password = "";
    res.status(200).send({
      status: "success",
      data: user,
      message: "Login successful!",
      image: [
        `https://intrigox-userprofilepictures.s3.ap-south-1.amazonaws.com/${user.avatar}`,
      ],
    });
  } catch (err) {
    res.status(400).send({ status: "error", message: err.message });
  }
};

// FOROGT PASSWORD
const forgotPassword = async (req, res) => {
  const email = req.body.email;
  const otp = generateOTP();
  const user = await getUserByEmail(email);

  try {
    if (!user) {
      throw new Error("User not found!");
    }
    const result = await User.updateOne(
      { _id: user._id },
      {
        $set: {
          otp: otp,
        },
      }
    );
    const mailData = await otpSendToEmailId("Reset Password Link", otp, email);
    mailData.transporter.sendMail(
      mailData.mailOptions,
      async function (error, info) {
        if (error) {
          console.log(error);
          throw new Error(
            "Something went wrong in otp sending to the email id."
          );
        } else {
          res.status(200).json({
            status: "success",
            message: "Otp has been sent to the given email id!",
          });
        }
      }
    );
  } catch (error) {
    res.status(400).send({ status: "error", message: error.message });
  }
};

//OTP VERIFICATION OF FORGOT PASSWORD
const otpVerification = async (req, res) => {
  try {
    const otp = req.body.otp;
    if (!otp) {
      throw new Error("Kindly provide an otp!");
    }
    const isUserPresent = await User.findOne({
      otp: otp,
    });
    if (!isUserPresent || !isUserPresent.otp || otp !== isUserPresent.otp) {
      throw new Error("otp is not matched with the sent otp! Send otp again.");
    }

    res.status(200).json({
      status: "success",
      message: "OTP Verification successfully done.",
    });
  } catch (err) {
    res.status(400).send({ status: "error", message: err.message });
  }
};
// RESET PASSWORD
const resetPassword = async (req, res) => {
  const newPassword = req.body.newPassword;
  const confirmPassword = req.body.confirmPassword;
  const email = req.body.email;

  const user = await getUserByEmail(email);
  try {
    //if user is not valid
    if (!user) {
      throw new Error("User not found!");
    }
    if (newPassword !== confirmPassword) {
      throw new Error("Password mismatch!");
    }

    const password = await bcrypt.hash(newPassword, 9);
    const result = await User.updateOne(
      { _id: user._id },
      {
        $set: {
          password,
          otp: "",
        },
      }
    );

    res.status(200).json({
      status: "success",
      message: "Password reset successfully!",
    });
  } catch (err) {
    res.status(400).send({ status: "error", message: err.message });
  }
};
const logout = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("Vefication failed!");
    }

    const existingUser = await User.findOne({ token: user.token });
    await User.updateOne(
      { _id: existingUser._id },
      {
        $set: {
          token: "",
        },
      }
    );
    res.status(200).json({
      status: "success",
      message: "Logout Successful!",
    });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

const googleAuth = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      throw new Error("Authorization failed!");
    }
    const accessToken = req.headers.authorization;
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${accessToken}`
    );
    if (!response || !response.data) {
      throw new Error("Verification failed!");
    }
    const googleUserData = response.data;
    const username = googleUserData.name;
    const email = googleUserData.email;
    console.log(email);
    const avatar = googleUserData.picture;

    //check whether any user exist with this email id or not!
    const isUserExist = await User.findOne({ email: email });
    // console.log(isUserExist);
    let data;
    let image;
    if (isUserExist ) {
      if(isUserExist.authType === "Email" || isUserExist.isImageUpdated === true){
        await isUserExist.generateAuthToken();
        await isUserExist.save();
        data = isUserExist;
        image = [`https://intrigox-userprofilepictures.s3.ap-south-1.amazonaws.com/${isUserExist.avatar}`];
      }else if(isUserExist.authType !== "Email" && isUserExist.isImageUpdated === false){
        await isUserExist.generateAuthToken();
        await isUserExist.save();
        data = isUserExist;
        image = [isUserExist.avatar];
      }
      //do login process
      // console.log("in the exist");
      

      // res.status(200).json({
      //   status: "success",
      //   data: isUserExist,
      //   message: "Sign In successful!",
      //   image: [
      //     `https://intrigox-userprofilepictures.s3.ap-south-1.amazonaws.com/${isUserExist.avatar}`,
      //   ],
      // });
      // return;
    }else {
      if (!req.body.myLanguage) {
        throw new Error("Kindly provide the User's native language!");
      }
      const myLanguage = req.body.myLanguage;
  
      if (
        googleUserData.iss !== "https://accounts.google.com" ||
        Date.now() >= googleUserData.exp * 1000
      ) {
        throw new Error("Invalid token!");
      }
  
      const newUser = new User({
        username,
        email,
        myLanguage,
        level: "Beginner",
        avatar,
        authType: "Google",
      });
  
      await newUser.generateAuthToken();
      await newUser.save();
      data = newUser;
      image = [newUser.avatar];
    }

    
    res.status(200).send({
      status: "success",
      data: data,
      message: "SignIn successful!",
      image: image,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "Error",
      mesage: err.message,
    });
  }
};

const facebookAuth = async (req, res) => {
  if (!req.headers.authorization) {
    throw new Error("Authorization failed!");
  }
  const accessToken = req.headers.authorization;
  try {
    const fields = "id,name,email,picture";
    const check = await axios.get(
      `https://graph.facebook.com/me?fields=${fields}&access_token=${accessToken}`
    );
    const userData = check.data;
    const facebookId = userData.id;
    const username = userData.name;
    const avatar = userData.picture.data.url;

    //check whether any user exist with this facebook id or not!
    const isUserExist = await User.findOne({ facebookId: facebookId });
    // console.log(isUserExist);
    let data;
    let image;
    if (isUserExist) {
      await isUserExist.generateAuthToken();
        await isUserExist.save();
        data = isUserExist;
      if(isUserExist.isImageUpdated === false){        
        image = [isUserExist.avatar];
      }else {
        image = [`https://intrigox-userprofilepictures.s3.ap-south-1.amazonaws.com/${isUserExist.avatar}`];
      }
      //do login process
      // console.log("in the exist");
      
      // res.status(200).send({
      //   status: "success",
      //   data: isUserExist,
      //   image: [isUserExist.avatar],
      //   message: "Sign In successful!",
      // });
      // return;
    }else {
      if (!req.body.myLanguage) {
        throw new Error("Kindly provide the User's native language!");
      }
      const myLanguage = req.body.myLanguage;
  
      const newUser = new User({
        username,
        myLanguage,
        level: "Beginner",
        avatar,
        authType: "Facebook",
        facebookId,
      });
  
      await newUser.generateAuthToken();
      await newUser.save();
      data = newUser;
      image = [newUser.avatar];
    }

    res.status(200).send({
      status: "success",
      data: data,
      message: "SignIn successful!",
      image: image,
    });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};
module.exports = {
  register1,
  register2,
  otpVerification,
  login,
  forgotPassword,
  resetPassword,
  logout,
  googleAuth,
  facebookAuth,
};
