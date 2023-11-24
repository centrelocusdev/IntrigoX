const express= require('express')
const router = express.Router();
const  {updateUserLevel, updateUserProfilePicture , userData} = require("../controllers/user");
const authentication = require('../middleware/authentication');
const multer = require("multer");
const path  = require('path');
const AVATAR_PATH = path.join('/public/image');

const storageEngine = multer.diskStorage({
    destination:(req, file, cb)=> {
        cb(null,  path.join(__dirname, '..' ,'/public/image'))
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}--${file.originalname}`);
    }
  })
  const checkFileType = (file, cb)=> {
    const fileTypes = /jpeg|jpg|png|gif|svg/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
  
    if (mimeType && extName) {
      return cb(null, true);
    } else {
      cb("Error: You can Only Upload Images!!");
    }
  }
  const upload =  multer({
    storage: storageEngine,
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb)=> {
      checkFileType(file, cb);
    }
  })

router.post('/updateUserLevel',authentication.auth, updateUserLevel );
// router.post('/updateProfilePicture' ,authentication.auth, upload.single('image'), updateUserProfilePicture );
router.get('/userData', authentication.auth, userData )
module.exports = router;