import express from "express"
const router = express.Router()

router.use('/book',require('./book')) //1부,2부 책

module.exports = router;