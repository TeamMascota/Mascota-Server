var util = require('../../modules/util')
var responseMessage = require('../../modules/responseMessage')
var statusCode = require('../../modules/statusCode')
const petService = require('../service/petService')


module.exports = {
    registerPet: async (req, res) => {
        let reqData=req.body;
        const images = req.files.map(img => img.location)
        try {
            await petService.registerPet(reqData,images);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_REGISTER_PET, ""))
        } catch (err) {
            if (err.statusCode == null) {
                err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
                err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
            }
            console.error(err)
            res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage))
        }
    },
}