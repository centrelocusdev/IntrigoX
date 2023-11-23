const jwt = require('jsonwebtoken')
const User = require('../models/User')
require('dotenv').config()

exports.auth = async (req, res, next) => {
  let  token;
    if(req.body && req.body.token){
     token = req.body.token;
  }else if(req.headers && req.headers.authorization ){
    token = req.headers.authorization;
  }
  if(!token){
    throw new Error("Verification failed!");
  }
  try {
      const payload = jwt.verify(token, process.env.JWT_SECRET)
      const user = await User.findById({_id: payload._id});
      if(!user){throw new Error("Verification failed!")}
      req.user = user;
      next()
  } catch (error) {
      res.status(400).json({
        status: "Error",
        message: error.message
      })
  }
}

