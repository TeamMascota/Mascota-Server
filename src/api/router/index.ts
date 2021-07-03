import express from "express"
const router = express.Router()

router.use('/api/rainbow',require('./rainbow')) //무지개 

module.exports = router;