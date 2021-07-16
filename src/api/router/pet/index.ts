var express = require('express')
var router = express.Router()
var petController = require('../../controller/petController')
var upload = require('../../../modules/multer')

router.get('/register/petInfo',petController.getRegisterPetInfo)
//router.post('/register',upload.array('images',5),petController.registerPet) //register pet
router.post('/register',petController.registerPet)
//router.post('/register/images',upload.array('images',4),petController.registerPetImg)
module.exports = router;