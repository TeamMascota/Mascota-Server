const util = require('../../modules/util')
const responseMessage = require('../../modules/responseMessage')
const statusCode = require('../../modules/statusCode')
const firstPartService=require('../service/firstPartService')


module.exports = {
    mainPage: async (req, res) => {
        const { userId } = req.params;
        try {
            const result = await firstPartService.getMainPage(userId)
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_RAINBOW_MAIN_PAGE, result))
        } catch (err) {
            console.error(err)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR))
        }
    }
}
export{}