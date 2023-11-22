const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 1,
    maxLenght: 15,
    trim: true,
    required: [true, 'Please enter your username']
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please Provide Valid Email',
    ],
    unique: true,
  },
  password: {
    type: String,
    minLength: 6,
    required: [true, 'Please Provide Password'],
  },
  token: String,
  otp: String,
  level: String,
  myLanguage: String,
  cummulativeScore: Number,
  currentScore: Number

}, { timestamps: { createdAt: 'created_at' , updatedAt: 'updated_at' }})

UserSchema.methods.generateAuthToken= async function(){
  const token = jwt.sign({_id: this._id.toString()} , process.env.JWT_SECRET)
  this.token = token
  await this.save()
  return token;
}

// UserSchema.pre('save', async function(next){
//   try{
//     if(this.isModified('password')){
//       this.password = await bcrypt.hash(this.password, 9);
//     }
//     next();
//   }catch(err){
//     console.log("Error in password matching" , err);
//   }
// })
module.exports = mongoose.model('User' , UserSchema);


