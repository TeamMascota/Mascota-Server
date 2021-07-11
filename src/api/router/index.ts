import express from "express"
const router = express.Router()

router.use('/chapter',require('./chapter'));//1부 목차
module.exports = router;