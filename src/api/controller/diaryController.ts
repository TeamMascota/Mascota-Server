const util = require('../../modules/util')
const responseMessage = require('../../modules/responseMessage')
const statusCode = require('../../modules/statusCode')
const diaryService = require('../service/diaryService')
module.exports = {
    postPrologue: async (req, res) => {
        const bookData = req.body;
        try {
            const result = await diaryService.postPrologue(bookData)
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
export { };