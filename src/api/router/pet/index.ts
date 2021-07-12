var express = require('express')
var router = express.Router()
var petController = require('../../controller/petController')

router.post('/register',petController.registerPet) //register pet

module.exports = router;