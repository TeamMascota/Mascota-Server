const util = require('../../modules/util')
const responseMessage = require('../../modules/responseMessage')
const statusCode = require('../../modules/statusCode')
const chapterService = require('../service/chapterService')

module.exports = {
    getChapterDiary: async (req, res) => {
        const chapterId=req.params.id;//id를 뺴면 객체를 보내줌
        try {
            const result = await chapterService.getChapterDiary(chapterId)
            res.status(statusCode.OK).send(util.success(statusCode.OK, result, ""))
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