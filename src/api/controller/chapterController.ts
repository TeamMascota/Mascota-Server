const util = require('../../modules/util')
const responseMessage = require('../../modules/responseMessage')
const statusCode = require('../../modules/statusCode')
const diaryService = require('../service/diaryService')

module.exports = {
    getChapterDiary: async (req, res) => {
        const chapterId = req.parms.id;
        try {
            const result = await diaryService.getChapterDiary(chapterId)
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