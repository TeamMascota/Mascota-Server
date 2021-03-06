"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var util = require('../../modules/util');
var responseMessage = require('../../modules/responseMessage');
var statusCode = require('../../modules/statusCode');
const petService = require('../service/petService');
module.exports = {
    getRegisterPetInfo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield petService.getPetInfo();
            console.log(typeof (statusCode.OK));
            console.log(typeof (statusCode.INTERNAL_SERVER_ERROR));
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_PET_INFO, result));
        }
        catch (error) {
            console.error(error);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
        }
    }),
    registerPet: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        //let reqData=JSON.parse(JSON.stringify(req.body))
        // console.log('type : '+typeof(reqData))
        // console.log('toObject : '+reqData)
        //const reqData = req.body
        let reqData = req.body;
        //let images = req.files.map(file=>file.location)
        //console.log('reqData : '+ reqData.pets[0])
        //const test = JSON.parse(reqData.pets)
        // console.log('11111111111111 : '+typeof(reqData.pets[0]))
        // console.log('reqData : '+reqData.pets)
        // console.log('userId : '+reqData.userId)
        // console.log('pets : '+reqData.pets[0])
        // console.log('gender : '+reqData.pets[0].gender)
        // console.log('kind : '+reqData.pets[0].kind)
        // console.log('title : '+reqData.pets[0].title)
        // console.log('startDate : '+reqData.pets[0].startDate)
        //console.log('reqData index : '+reqData.pets[0].name) //undifned
        //console.log('reqData2 : '+typeof(test))
        //console.log('images : '+images)
        try {
            const result = yield petService.registerPet(reqData);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_REGISTER_PET, result));
        }
        catch (err) {
            if (err.statusCode == null) {
                err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
                err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
            }
            console.error(err);
            res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage));
        }
    })
};
//# sourceMappingURL=petController.js.map