const express= require('express')
const router = express.Router()
const {login, register1,forgotPassword,resetPassword,logout, register2} = require('../controllers/auth')
const authentication = require('../middleware/authentication');
console.log("in the AUTH router");

router.post('/register1', register1)
router.post('/register2', register2)
router.post('/login',  login)
router.post('/forgotPassword',forgotPassword)
router.post('/resetPassword', resetPassword)
router.post('/logout', authentication.auth, logout)


module.exports = router


// const express = require('express')
// const Router = express.Router()