var util = require('../../modules/util')
var responseMessage = require('../../modules/responseMessage')
var statusCode = require('../../modules/statusCode')
const rainbowService = require('../service/rainbowService')

module.exports = {
    mainPage: async (req, res) => {
        const { userId, petId } = req.params;
        try {
            const result = await rainbowService.getMainPage(userId, petId)
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_RAINBOW_MAIN_PAGE, result))
        } catch (err) {
            console.error(err)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR))
        }
    },

    selectRainbowPet: async (req, res) => {
        try {
            const result = await rainbowService.selectPet();
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_RAINBOW_PET, result))
        } catch (err) {
            console.error(err)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR))
        }
    },

    setRainbowPet: async (req, res) => {
        const petId = req.params.petId
        try {
            const result = await rainbowService.setPartingRainbowPet(petId);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_PARTING_PET_COMMENT, result))
        } catch (err) {
            console.error(err)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR))
        }
    },

    cancelPartingPet: async(req,res)=>{
        const petId = req.params.petId
        try{
            await rainbowService.cancelPartingPet(petId)
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_DELETE_PARTING_PET))
        }catch(err){
            console.error(err)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR))
        }
    },

    getReadyPartingPetComment: async (req, res) => {
        const petId = req.params.petId
        try {
            const result = await rainbowService.getReadyPartingPetComment(petId)
            return res.status(statusCode.OK).send(util.success(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SUCCESS_GET_READY_PARTING_PET_COMMENT, result))
        } catch (err) {
            console.error(err)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR))
        }
    },

    theBestMoment: async (req, res) => {   //보류 무지개 로직 제일 마지막에 구현
        const { userId, petId } = req.params
        try {
            const result = await rainbowService.getTheBestMoment(userId, petId)
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_BEST_MOMENT, result, result))
        } catch (err) {
            console.error(err)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR))
        }
    },

    getPartingPetName: async (req, res) => {
        const { petId } = req.params
        try {
            const result = await rainbowService.getPartingPetName(petId)
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_PARTING_PETNAME, result, result))
        } catch (err) {
            console.error(err)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR))
        }
    },

    postEpilogue: async (req, res) => {
        const { userId, petId } = req.params
        const data = req.body
        try {
            await rainbowService.postEpilogue(userId, data)
            const result = await rainbowService.getMainPage(userId, petId)
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_POST_EPILOGUE, result))
        } catch (err) {
            console.error(err)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR))
        }
    },

    theBestMomentSub: async(req,res)=>{
        const {userId, petId} = req.params
        try{
            const theBestMoment = await rainbowService.getTheBestMoment(userId, petId)
            const result = await rainbowService.getTheBestMomentSub(petId,theBestMoment)
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_RAINBOW_SUB_PAGE,result))
        }catch(err){
            console.error(err)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR))
        }
    }
}