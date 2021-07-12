var express = require('express')
var router = express.Router()
const calendarController = require('../../controller/calendarController')

router.get('/:year/:month/:part',calendarController.getCalendar)//캘린더

module.exports = router