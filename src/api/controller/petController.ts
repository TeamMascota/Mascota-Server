var util = require('../../modules/util')
var responseMessage = require('../../modules/responseMessage')
var statusCode = require('../../modules/statusCode')
const petService = require('../service/petService')


module.exports = {
    registerPet: async (req, res) => {
        let reqData=req.body
        let images = req.files.map(file=>file.location)
        try {
            const result = await petService.registerPet(reqData, images);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_REGISTER_PET, result))
        } catch (err) {
            if (err.statusCode == null) {
                err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
                err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
            }
            console.error(err)
            res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage))
        }
    },

    // registerPetImg:async(req,res)=>{
    //     const image = req.files.map(file=>file.location)
    //     const petImageInfo = req.body
    //     console.log('petImageInfo : '+petImageInfo)
    //     try{
    //         await petService.registerPetImg(image,petImageInfo)
    //         res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_REGISTER_PET_IMG))
    //     }catch(err){
    //         console.error(err)
    //         res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage))
    //     }
    // }
}