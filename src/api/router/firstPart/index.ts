import express from "express"
const router = express.Router()
const firstPartController = require('../../controller/FirstPartController')

//1부 메인페이지 불러오기
router.get('/main/:userId', firstPartController.mainPage)

module.exports = router;