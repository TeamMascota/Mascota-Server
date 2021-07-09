var express = require('express')
var router = express.Router()
const secondPartController = require('../../controller/secondPartController')

router.get('/main/:userId',secondPartController.getMainPage)

module.exports = router