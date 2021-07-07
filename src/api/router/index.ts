import express from "express"
const router = express.Router()

router.use('/firstPart',require('./firstPart')) //1부

module.exports = router;