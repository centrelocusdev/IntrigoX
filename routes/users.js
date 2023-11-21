const express= require('express')
const router = express.Router();
const  {updateUserLevel} = require("../controllers/user");
const authentication = require('../middleware/authentication');

router.post('/updateUserLevel',authentication.auth, updateUserLevel );

module.exports = router;