import express from "express"
const router = express.Router()

router.use('/rainbow',require('./rainbow')) //무지개\
router.use('/calendar',require('./calendar')) //캘린더

module.exports = router;