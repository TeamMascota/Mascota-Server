var express = require('express')
var router = express.Router()
var petController = require('../../controller/petController')
var upload = require('../../../modules/multer')

router.post('/register',petController.registerPet) //register pet
router.post('/register/images',upload.array('images',4),petController.registerPetImg)

module.exports = router;