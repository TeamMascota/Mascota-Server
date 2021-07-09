const express = require('express')
const router = express.Router()
const diaryController = require('../../controller/diaryController')

router.get('/diaries/:id',diaryController.getChapterDiary) //1부 목차별 일기 조회

module.exports = router;
export{};