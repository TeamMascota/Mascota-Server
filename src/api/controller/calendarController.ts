var util = require('../../modules/util')
var responseMessage = require('../../modules/responseMessage')
var statusCode = require('../../modules/statusCode')
const calendarService = require('../service/calendarService')

module.exports={
    getCalendar:async(req,res)=>{
        const {year,month,part} = req.params
        try{
            console.log(month +'+'+part)
            const result = await calendarService.getDiaryPerDate(year,month,part)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.SUCCESS_GET_MONTH_CALENDAR,result))
        }catch(err){
            console.error(err)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR))
        }
    },
}