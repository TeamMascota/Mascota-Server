var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var util = require('../../modules/util');
var responseMessage = require('../../modules/responseMessage');
var statusCode = require('../../modules/statusCode');
var diaryService = require('../service/diaryService');
var firstPartService = require('../service/firstPartService');
module.exports = {
    postPrologue: (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.params;
        const bookData = req.body;
        //const bookImage = req.file.location
        try {
            yield diaryService.postPrologue(userId, bookData);
            //const result=await firstPartService.getMainPage(userId)
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_POST_PROLOGUE));
        }
        catch (err) {
            console.error(err);
            if (err.statusCode == null) {
                err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
                err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
            }
            return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage));
        }
    }),
    postPetDiary: (req, res) => __awaiter(this, void 0, void 0, function* () {
        const diaryData = req.body;
        //const diaryImages = req.files.map(file => file.location)
        try {
            const result = yield diaryService.postPetDiary(diaryData);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_POST_PETDIARY, ""));
        }
        catch (err) {
            console.error(err);
            if (err.statusCode == null) {
                err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
                err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
            }
            return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage));
        }
    }),
    getPetDiary: (req, res) => __awaiter(this, void 0, void 0, function* () {
        const petDiaryId = req.params.id; //id를 뺴면 객체를 보내줌
        try {
            const result = yield diaryService.getPetDiary(petDiaryId);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_PETDIARY, result));
        }
        catch (err) {
            console.error(err);
            if (err.statusCode == null) {
                err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
                err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
            }
            return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage));
        }
    }),
    putPetDiary: (req, res) => __awaiter(this, void 0, void 0, function* () {
        const petDiaryId = req.params.id;
        const diaryData = req.body;
        try {
            const result = yield diaryService.putPetDiary(petDiaryId, diaryData);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_PUT_PETDIARY, ""));
        }
        catch (err) {
            console.error(err);
            if (err.statusCode == null) {
                err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
                err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
            }
            return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage));
        }
    }),
    deletePetDiary: (req, res) => __awaiter(this, void 0, void 0, function* () {
        const petDiaryId = req.params.id;
        try {
            const result = yield diaryService.deletePetDiary(petDiaryId);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_DELETE_PETDIARY, result));
        }
        catch (err) {
            console.error(err);
            if (err.statusCode == null) {
                err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
                err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
            }
            return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage));
        }
    })
};
//# sourceMappingURL=diaryController.js.map