const util = require('../../modules/util')
const responseMessage = require('../../modules/responseMessage')
const statusCode = require('../../modules/statusCode')
const diaryService = require('../service/diaryService')
module.exports = {
    postPrologue: async (req, res) => {
        const bookData = req.body;
        try {
            const result = await diaryService.postPrologue(bookData)
            res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.SUCCESS_POST_PROLOGUE, ""))
        } catch (err) {
            console.error(err)
            if (err.statusCode == null) {
                err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
                err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
            }
            return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage))
        }
    },
    postPetDiary: async (req, res) => {
        const diaryData = req.body;
        try {
            const result = await diaryService.postPetDiary(diaryData)
            res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.SUCCESS_POST_PETDIARY, ""))
        } catch (err) {
            console.error(err)
            if (err.statusCode == null) {
                err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
                err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
            }
            return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage))
        }
    },
    getPetDiary: async(req,res)=>{
        const petDiaryId=req.params.id;//id를 뺴면 객체를 보내줌
        try {
            const result = await diaryService.getPetDiary(petDiaryId)
            res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.SUCCESS_GET_PETDIARY,result))
        } catch (err) {
            console.error(err)
            if (err.statusCode == null) {
                err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
                err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
            }
            return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage))
        }
    },
    putPetDiary: async(req,res)=>{
        const petDiaryId=req.params.id;
        const diaryData=req.body;
        try {
            const result = await diaryService.putPetDiary(petDiaryId,diaryData)
            res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.SUCCESS_PUT_PETDIARY,""))
        } catch (err) {
            console.error(err)
            if (err.statusCode == null) {
                err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
                err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
            }
            return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage))
        }
    },
    deletePetDiary:async(req,res)=>{
        const petDiaryId=req.params.id;
        try{
            const result = await diaryService.deletePetDiary(petDiaryId,)
            res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.SUCCESS_DELETE_PETDIARY, result))
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