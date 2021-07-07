const express = require('express')
const router = express.Router()
const bookController = require('../../controller/bookController')

router.post('/prologue',bookController.postPrologue) //1부 프롤로그 작성
module.exports = router;
export{};