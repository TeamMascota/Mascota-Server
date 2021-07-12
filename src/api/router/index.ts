import express from "express"
const router = express.Router();

router.use('/user',require('./user'))//user
router.use('/pet',require('./pet'))//pet
router.use('/diary',require('./diary'));//1부 일기
router.use('/rainbow', require('./rainbow')) //무지개
router.use('/calendar', require('./calendar')) //캘린더
router.use('/secondPart', require('./secondPart'))//2부

module.exports = router;