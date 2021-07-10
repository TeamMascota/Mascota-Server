var util = require('../../modules/util')
var responseMessage = require('../../modules/responseMessage')
var statusCode = require('../../modules/statusCode')
const secondPartService = require('../service/secondPartService')

module.exports = {
    getMainPage: async (req, res) => {
        const { userId } = req.params
        try {
            const result = await secondPartService.getMainPage(userId)
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_SECOND_PART_MAIN_PAGE, result))
        } catch (err) {
            console.error(err)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR))
        }
    },

    getDiaryOfTableContents: async (req, res) => {
        const { tableContentsId } = req.params
        try {
            const result = await secondPartService.getDiaryOfTableContents(tableContentsId)
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_SECOND_PART_DIARY_OF_TABLECONTENTS, result))
        } catch (err) {
            console.error(err)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR))
        }
    },

    getSecondPartChapterList:async(req,res)=>{
        try{
            const result = await secondPartService.getSecondPartChapterList()
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_SECOND_PART_CHAPTER_LIST, result))
        }catch(err){
            console.error(err)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR))
        }
    }
}