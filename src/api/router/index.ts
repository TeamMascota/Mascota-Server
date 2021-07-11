import express from "express"
const router = express.Router();

// router.use('/rainbow',require('./rainbow')) //무지개 
router.use('/user', require('./user'))//user
router.use('/pet', require('./pet'))//pet

module.exports = router;