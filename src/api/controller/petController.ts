var util = require('../../modules/util')
var responseMessage = require('../../modules/responseMessage')
var statusCode = require('../../modules/statusCode')
const petService = require('../service/petService')


module.exports = {
    registerPet: async (req, res) => {
        let reqData=req.body;
        console.log(req.body)
        try {
            const result = await petService.registerPet(reqData);
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
    setImages:async(req,res)=>{
        const imagesUrls = req.files.map(file=>file.location)
        res.send({
            imagesUrls
        })
    }
}