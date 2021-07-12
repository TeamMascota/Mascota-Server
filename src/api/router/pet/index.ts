var express = require('express')
var router = express.Router()
var petController = require('../../controller/petController')
var upload = require('../../../modules/multer')

router.post('/register',petController.registerPet) //register pet
router.post('/multer',upload.array('images',3),petController.setImages)

module.exports = router;