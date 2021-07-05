const express = require('express')
const router = express.Router()
const rainbowController = require('../../controller/rainbowController')

router.get('/main/:userId/:petId',rainbowController.mainPage) //1.5부 무지개 홈 화면
router.get('/pet',rainbowController.selectRainbowPet)

module.exports = router;