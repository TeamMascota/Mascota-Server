import { json } from "body-parser"

var util = require('../../modules/util')
var responseMessage = require('../../modules/responseMessage')
var statusCode = require('../../modules/statusCode')
const petService = require('../service/petService')


module.exports = {
    registerPet: async (req, res) => {
        //let reqData=JSON.parse(JSON.stringify(req.body))
        // console.log('type : '+typeof(reqData))
        // console.log('toObject : '+reqData)
        //const reqData = req.body
        let reqData = req.body
        let images = req.files.map(file=>file.location)
        //console.log('reqData : '+ reqData.pets[0])
        //const test = JSON.parse(reqData.pets)
        console.log('11111111111111 : '+typeof(reqData.pets[0]))
        console.log('reqData : '+reqData.pets)
        console.log('userId : '+reqData.userId)
        console.log('pets : '+reqData.pets[0])
        console.log('gender : '+reqData.pets[0].gender)
        console.log('kind : '+reqData.pets[0].kind)
        console.log('title : '+reqData.pets[0].title)
        console.log('startDate : '+reqData.pets[0].startDate)
        //console.log('reqData index : '+reqData.pets[0].name) //undifned
        //console.log('reqData2 : '+typeof(test))
        console.log('images : '+images)
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