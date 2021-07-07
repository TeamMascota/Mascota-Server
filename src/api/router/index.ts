import express from "express"
const router = express.Router()

router.use('/book',require('./book')) //1부,2부 책
router.use('/diary',require('./diary'));//1부 일기
module.exports = router;