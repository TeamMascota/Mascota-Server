const express = require('express')
const router = express.Router()
const petController = require('../../controller/petController')

router.post('/register',petController.registerPet) //register pet
module.exports = router;