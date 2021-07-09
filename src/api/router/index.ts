import express from "express"
const router = express.Router()

router.use('/rainbow',require('./rainbow')) //무지개\
router.use('/calendar',require('./calendar')) //캘린더
router.use('/secondPart',require('./secondPart'))//2부

module.exports = router;