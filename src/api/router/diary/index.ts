const express = require('express')
const router = express.Router()
const diaryController = require('../../controller/diaryController')

router.post('/prologue',diaryController.postPrologue) //1부 프롤로그 작성
router.post('/pet',diaryController.postPetDiary)//반려동물 일기 작성
module.exports = router;
export{};