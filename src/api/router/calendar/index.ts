var express = require('express')
var router = express.Router()
const calendarController = require('../../controller/calendarController')

router.get('/:year/:month/:part',calendarController.getCalendar)//월 캘린더
// router.get('/year/:year/:moth/:part',calendarController.yearCalendar)//년 캘린더

module.exports = router