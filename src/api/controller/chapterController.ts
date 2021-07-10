const util = require('../../modules/util')
const responseMessage = require('../../modules/responseMessage')
const statusCode = require('../../modules/statusCode')
const chapterService = require('../service/chapterService')

module.exports = {
    getChapterDiary: async (req, res) => {
        const chapterId=req.params.id;//id를 뺴면 객체를 보내줌
        try {
            const result = await chapterService.getChapterDiary(chapterId)
            res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.SUCCESS_GET_CHAPTER_PETDIARY , result))
        } catch (err) {
            console.error(err)
            if (err.statusCode == null) {
                err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
                err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
            }
            return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage))
        }
    },
    getChapterList:async(req,res)=>{
        const userId=req.params.id;
        try {
            const result = await chapterService.getChapterList(userId)
            res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.SUCCESS_GET_CHAPTERLIST , result))
        } catch (err) {
            console.error(err)
            if (err.statusCode == null) {
                err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
                err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
            }
            return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage))
        }
    },
    postChapterList:async(req,res)=>{
        const userId=req.params.id
        const chapterTitle=req.body.chapterTitle;
        try {
            const result = await chapterService.postChapterList(userId,chapterTitle)
            res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.SUCCESS_POST_CHAPTERLIST , result))
        } catch (err) {
            console.error(err)
            if (err.statusCode == null) {
                err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
                err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
            }
            return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage))
        }
    }
}
export{}