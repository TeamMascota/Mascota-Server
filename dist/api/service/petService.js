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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Pet_1 = __importDefault(require("../../models/pet/Pet"));
const responseMessage = require('../../modules/responseMessage');
const statusCode = require('../../modules/statusCode');
const util = require('../../modules/util');
const petService = require('../service/petService');
var mongoose = require('mongoose');
require("../../models/user/User");
require("../../models/pet/Pet");
module.exports = {
    registerPet: (reqData, images) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //error handling
            let pets = [];
            const startDate = new Date(reqData.pets[0].startDate);
            startDate.setDate(startDate.getDate() + 1);
            for (let i = 0; i < reqData.pets.length; i++) {
                let pet = new Pet_1.default({
                    name: reqData.pets[i].name,
                    kind: reqData.pets[i].kind,
                    gender: reqData.pets[i].gender,
                    imgs: images[i],
                    user: mongoose.Types.ObjectId(reqData._id),
                    rainbow: false,
                    startDate: new Date(startDate)
                    // findUser, UserId만 해서 되면 가능
                    //book://나중에 책을 등록할때, pet에 book을 등록. 연관관계 확인. 안들어가있는게 있으면 나중에 같이 넣어야됨.
                    //SETTER사용. pet 찾아서 setter로 넣기.
                });
                pets[i] = pet;
            }
            console.log(reqData);
            //db save
            for (let i = 0; i < pets.length; i++) {
                yield pets[i].save();
            }
        }
        catch (err) {
            console.log(err);
            throw { statusCode: statusCode.INTERNAL_SERVER_ERROR, responseMessage: responseMessage.INTERNAL_SERVER_ERROR };
        }
    })
};
//# sourceMappingURL=petService.js.map