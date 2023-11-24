const express= require('express')
const router = express.Router();
const  {updateUserLevel, updateUserProfilePicture , userData , updateUserProfileWithS3} = require("../controllers/user");
const authentication = require('../middleware/authentication');
const path  = require('path');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const AVATAR_PATH = path.join('/public/image');

const s3 = new AWS.S3({
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
    },
    region: process.env.REGION
})

const uploadWithMulter = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.BUCKET_PROFILE_PICTURE,
        metadata: function(req, file,cb){
            cb(null, {fieldname: file.fieldname} )
        },
        key:function(req, file, cb){
            cb(null, file.originalname)
        }
    })
})

router.post('/updateUserLevel',authentication.auth, updateUserLevel );
router.post('/updateProfilePicture' ,authentication.auth, uploadWithMulter.single("image"), updateUserProfileWithS3 );
router.get('/userData', authentication.auth, userData )
module.exports = router;