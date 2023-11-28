const express= require('express')
const router = express.Router()
const journey = require('../controllers/journey');
const authentication = require('../middleware/authentication');

router.post('/languageConvert' , journey.languageConvert);
router.get('/getChaptersData' , authentication.auth, journey.getChaptersData);
router.get('/storeChaptersData' , journey.storeChaptersData);
module.exports = router
