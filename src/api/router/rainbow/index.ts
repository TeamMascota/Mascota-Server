const express = require('express');
const router = express.Router();
const rainbowController = require('../../controller/rainbowController')

router.get('/main/:userId/:petId',rainbowController.mainPage) //1.5부 무지개 홈 화면 불러오기
router.get('/pet',rainbowController.selectRainbowPet)   //1.5부 무지개 반려동물 선택 화면 불러오기
router.get('/pet/:petId',rainbowController.setRainbowPet)   //1.5부 무지개 반려동물 선택 적용 & 이별하는 무지개 다리 멘트
router.get('/record/:petId',rainbowController.getReadyPartingPetComment)

module.exports = router;
//solve error TS2451 : Cannot redeclare block-scoped variable
export{};