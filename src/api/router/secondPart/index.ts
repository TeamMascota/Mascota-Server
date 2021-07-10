var express = require('express')
var router = express.Router()
const secondPartController = require('../../controller/secondPartController')

router.get('/main/:userId', secondPartController.getMainPage)
router.get('/chapter/user/:tableContentsId', secondPartController.getDiaryOfTableContents)
router.get('/chapter/list',secondPartController.getSecondPartChapterList)

module.exports = router