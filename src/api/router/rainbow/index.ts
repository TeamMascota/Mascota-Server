var express = require('express')
var router = express.Router()
let rainbowController = require('../../controller/rainbowController')

router.get('/main/:userId/:petId',rainbowController.mainPage) //1.5부 무지개 홈 화면 불러오기
router.get('/pet',rainbowController.selectRainbowPet)   //1.5부 무지개 반려동물 선택 화면 불러오기
router.get('/pet/:petId',rainbowController.setRainbowPet)   //1.5부 무지개 반려동물 선택 적용 & 이별하는 무지개 다리 멘트
router.delete('/pet/:petId',rainbowController.cancelPartingPet) //1.5부 무지개 반려동물 떠나보내기 취소
router.get('/record/:petId',rainbowController.getReadyPartingPetComment)    //1.5부 이별을 준비하는 작가의 기록 시작 멘트 불러오기
router.get('/moment/:userId/:petId',rainbowController.theBestMoment)    //1.5부 무지개 최고의 순간
router.get('/parting/pet/:petId',rainbowController.getPartingPetName)   //1.5부 반려동물 이름 반환
router.post('/epilogue/:userId/:petId',rainbowController.postEpilogue)  //1.5부 작가의 말 작성
router.get('/moment/sub/:userId/:petId',rainbowController.theBestMomentSub) //1.5부 무지개 서브 홈

module.exports = router;