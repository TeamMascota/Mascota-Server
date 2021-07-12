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
const rainbowService = require('../service/rainbowService');
module.exports = {
    mainPage: (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { userId, petId } = req.params;
        try {
            const result = yield rainbowService.getMainPage(userId, petId);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_RAINBOW_MAIN_PAGE, result));
        }
        catch (err) {
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
        }
    }),
    selectRainbowPet: (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield rainbowService.selectPet();
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_RAINBOW_PET, result));
        }
        catch (err) {
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
        }
    }),
    setRainbowPet: (req, res) => __awaiter(this, void 0, void 0, function* () {
        const petId = req.params.petId;
        try {
            const result = yield rainbowService.setPartingRainbowPet(petId);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_PARTING_PET_COMMENT, result));
        }
        catch (err) {
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
        }
    }),
    cancelPartingPet: (req, res) => __awaiter(this, void 0, void 0, function* () {
        const petId = req.params.petId;
        try {
            yield rainbowService.cancelPartingPet(petId);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_DELETE_PARTING_PET));
        }
        catch (err) {
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
        }
    }),
    getReadyPartingPetComment: (req, res) => __awaiter(this, void 0, void 0, function* () {
        const petId = req.params.petId;
        try {
            const result = yield rainbowService.getReadyPartingPetComment(petId);
            return res.status(statusCode.OK).send(util.success(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SUCCESS_GET_READY_PARTING_PET_COMMENT, result));
        }
        catch (err) {
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
        }
    }),
    theBestMoment: (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { userId, petId } = req.params;
        try {
            const result = yield rainbowService.getTheBestMoment(userId, petId);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_BEST_MOMENT, result, result));
        }
        catch (err) {
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
        }
    }),
    getPartingPetName: (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { petId } = req.params;
        try {
            const result = yield rainbowService.getPartingPetName(petId);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_PARTING_PETNAME, result, result));
        }
        catch (err) {
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
        }
    }),
    postEpilogue: (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { userId, petId } = req.params;
        const data = req.body;
        try {
            yield rainbowService.postEpilogue(userId, data);
            const result = yield rainbowService.getMainPage(userId, petId);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_POST_EPILOGUE, result));
        }
        catch (err) {
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
        }
    }),
    theBestMomentSub: (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { userId, petId } = req.params;
        try {
            const theBestMoment = yield rainbowService.getTheBestMoment(userId, petId);
            const result = yield rainbowService.getTheBestMomentSub(petId, theBestMoment);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_RAINBOW_SUB_PAGE, result));
        }
        catch (err) {
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
        }
    })
};
//# sourceMappingURL=rainbowController.js.map