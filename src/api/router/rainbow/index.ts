const express = require('express')
const router = express.Router()
const rainbowController = require('../../controller/rainbowController')

router.get('/main/:userId/:petId',rainbowController.getRainbowMainView) //1.5부 무지개 홈 화면

module.exports = router;