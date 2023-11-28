const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");
const User = require("../models/User");
const UserRegistration = require("../models/UserRegistration");
var bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const axios = require('axios');
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
    }
    // If account with received email id already exists so return error message.
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("User is already exist with the given email id!");
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
    });

    await UserRegistration.deleteOne({ _id: userData.id });

    await newUser.generateAuthToken();
    await newUser.save();
    newUser.password = undefined;
    res.status(200).json({
      status: "success",
      message: "Signup successful!",
      data: newUser,
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
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      throw new Error("Incorrect Password, Please write correct password");

    await user.generateAuthToken();
    await user.save();
    req.user = user;
    user.password = "";
    res
      .status(200)
      .send({ status: "success", data: user, message: "Login successful!" });
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
    const serverAuthCode = req.body.serverAuthCode;
    const accessToken = req.body.accessToken;
    // console.log(serverAuthCode, accessToken);

    if (!serverAuthCode || !accessToken) {
      throw new Error("kindly provide the valid info!");
    }
    await axios({
      method: "get",
      url:
     ` https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${accessToken}`,
      withCredentials: true,
      "Content-Type":"application/json"
    })
      .then(function (response) {
        console.log("in the response");
        console.log("response==>", response.data);
        // flag = true;
        // id = response.data.kid
      })
      .catch(function (error) {
        console.log("error" , error);
      });
      res.send("success");
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
};
