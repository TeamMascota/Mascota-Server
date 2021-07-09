const express = require('express')
const router = express.Router()
const chapterController = require('../../controller/chapterController')

router.get('/pet/:id',chapterController.getChapterDiary) //1부 목차별 일기 조회

module.exports = router;
export{};