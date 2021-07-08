const express = require('express')
const router = express.Router()
const diaryController = require('../../controller/diaryController')

router.post('/prologue',diaryController.postPrologue) //1부 프롤로그 작성
router.post('/pet',diaryController.postPetDiary)//반려동물 일기 작성
router.get('/pet/:id',diaryController.getPetDiary)//반려동물 일기 상세 조회
router.put('/pet',diaryController.putPetDiary)//반려동물 일기 수정
router.delete('/pet',diaryController.deletePetDiary)//반려동물 일기 삭제
module.exports = router;
export{};