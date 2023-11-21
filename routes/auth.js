const express= require('express')
const router = express.Router()
const {login, register,forgotPassword,resetPassword,logout} = require('../controllers/auth')
const authentication = require('../middleware/authentication');
router.post('/register',register)
router.post('/login',  login)
router.post('/forgotPassword',forgotPassword)
router.post('/resetPassword', resetPassword)
router.post('/logout', authentication.auth, logout)


module.exports = router


// const express = require('express')
// const Router = express.Router()