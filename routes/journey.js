const express= require('express')
const router = express.Router()
const journey = require('../controllers/journey');

router.post('/languageConvert' , journey.languageConvert);
router.get('/getChaptersData' , journey.getChaptersData);
router.get('/storeChaptersData' , journey.storeChaptersData);
module.exports = router
