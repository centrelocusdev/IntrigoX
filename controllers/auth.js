const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");
const User = require("../models/User");
const UserRegistration = require('../models/UserRegistration');
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");

const OTP_CONFIG= {
  upperCaseAlphabets: true,
  specialChars: false,
}
const generateOTP = () => {
  const OTP = otpGenerator.generate(5, OTP_CONFIG);
  return OTP;
};

//get user by email
const getUserByEmail = async(email)=> {
const user = await User.findOne({email});
return user;
}

// OTP send to the email id
const otpSendToEmailId = async(subject , otp, email)=> {
try{
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD
    },
    
  });
  var mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: subject,
    text: `Here is the OTP ${otp}. Use this to reset password.`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      return true;
    }
  });
}catch(err){
  console.log("Error" , err.message);
}
}

// REGISTRATION
const register1 = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const myLanguage = req.body.language;
    if(!email || !name || !password  || !myLanguage){
      throw new Error("Name, Email, Password and my language are compulsory fields!");
    }
      // If account with received email id already exists so return error message.
      const user = await User.findOne({ email });
      if (user) {
        throw new Error("User is already exist with the given email id!");
      }

      const userWithOtp = await UserRegistration ({email});
      if(userWithOtp){
        await UserRegistration.deleteOne({email});
      }
      // OTP Ceation
      const otp =  generateOTP();
      // Data saved to DB
      const savedUser = new UserRegistration({
        email,
        password,
        name,
        myLanguage,
        otp: otp
      })
      await savedUser.save();

      // OTP send to email id
      const otpSent = otpSendToEmailId('Registration OTP' , otp , email);
      if(!otpSent){
        throw new Error("Something went wrong in otp sending to the email id.");
      }
     
      res.status(200).json({
        status: "success",
        message: "Otp has been sent to the given email id!"
      })
    
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err.message,
    });
  }
};

const register2 = async(req, res)=> {
  const otp = req.body.otp;

  const userData = await UserRegistration.findOne({
    otp
  })
  if(!userData){
    throw new Error('OTP Is not present in db!');
  }
  if(userData.otp !== otp){
    throw new Error('Invalid OTP!');
  }

  const newUser = new User({
    email: userData.email,
    password: userData.password,
    name: userData.name,
    myLanguage: userData.myLanguage,
    level: 'beginner',

  });

  await UserRegistration.deleteOne({_id: userData.id});

      await newUser.generateAuthToken();
      await newUser.save();
      newUser.password = undefined;
      res.status(200).json({
        status: "success",
        message: "Signup successful!",
        data: newUser,
      });
}

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found, please sign up first!")
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Incorrect Password, Please write correct password");
    else {
    
      await user.generateAuthToken();
      await user.save();
      req.user = user;
      user.password = "";
      res.status(200).send({ status: "success", data: user, message: "Login successful!"});
    }
  } catch (err) {
    res.status(400).send({ status: "error", message: err.message });
  }
  
};

// FOROGT PASSWORD
const forgotPassword = async (req, res) => {
  const email = req.body.email;
  const otp =  generateOTP();
  const user = await getUserByEmail(email);
   

  try{
    if(!user){
      throw new Error("User not found!")
    }
    const result = await User.updateOne({_id: user._id} , {
      $set: {
        otp: otp
      }
    })
    const sentOTP = otpSendToEmailId('Reset Password Link' , otp, email);
    if(!sentOTP){
      throw new Error("Something went wront in otp sending to the email id.");
    }

    res.status(200).json({
      status: 'success',
      message: "OTP has been sent to email id!"
    })


  }catch(error){
    res.status(400).send({status: "error" , message: error.message});
  }
};

// RESET PASSWORD
const resetPassword = async (req, res) => {
  const otp = req.body.otp;
    const newPassword = req.body.newPassword;
    const email = req.body.email;
    const user = await getUserByEmail(email);
    try{
      //if user is not valid
      if(!user){
        throw new Error("User not found!")
      }
      // if otp is not valid
      if(user.otp != otp){
        throw new Error("OTP is invalid!")
      }

      const password = await bcrypt.hash(newPassword, 9);
      const result = await User.updateOne({_id: user._id} , {
        $set: {
          password,
          otp: ""
        }
      })
        
        res.status(200).json({
          status:'success',
          message: "Password reset successfully!"
        })
      
    }catch(err){
      res.status(400).send({ status: "error", message: err.message });

    }
};
const logout = async (req, res) => {
  try {
    const user = req.user;
    if(!user){throw new Error("Vefication failed!")}

    const existingUser = await User.findOne({"token": user.token});
    await User.updateOne({_id: existingUser._id} , {
      $set: {
        "token": ""
      }
    })
      res.status(200).json({
        status: "success",
        message: "Logout Successful!"
      })
   
  } catch (err) {
    res.status(400).json({status: 'error', message: err.message });
  }
}
module.exports = { register1,register2, login, forgotPassword, resetPassword , logout};
