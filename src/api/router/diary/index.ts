var express = require('express')
var router = express.Router()
var diaryController = require('../../controller/diaryController')
var upload = require('../../../modules/multer')

router.post('/prologue/:userId',diaryController.postPrologue) //1부 프롤로그 작성
router.post('/pet',diaryController.postPetDiary)//반려동물 일기 작성
router.get('/pet/:id',diaryController.getPetDiary)//반려동물 일기 상세 조회
router.put('/pet/:id',diaryController.putPetDiary)//반려동물 일기 수정
router.delete('/pet/:id',diaryController.deletePetDiary)//반려동물 일기 삭제
router.post('/pet/withImage',upload.array('images',5),diaryController.postPetDiaryWithImage)
module.exports = router;