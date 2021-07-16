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
const User_1 = __importDefault(require("../../models/user/User"));
const Pet_1 = __importDefault(require("../../models/pet/Pet"));
const PetInfoDto_1 = require("../../dto/rainbow/petDto/PetInfoDto");
const responseMessage = require('../../modules/responseMessage');
const statusCode = require('../../modules/statusCode');
const util = require('../../modules/util');
const petService = require('../service/petService');
var mongoose = require('mongoose');
require("../../models/user/User");
require("../../models/pet/Pet");
module.exports = {
    getPetInfo: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const findUser = yield User_1.default.find().populate({
                path: "pets"
            });
            console.log('getPetInfo List');
            const findPets = findUser[0].pets;
            return new PetInfoDto_1.PetsInfoDto(findPets.map(pet => new PetInfoDto_1.PetInfoDto(pet)));
        }
        catch (error) {
            throw error;
        }
    }),
    registerPet: (reqData) => __awaiter(void 0, void 0, void 0, function* () {
        const { pets, userId } = reqData;
        console.log('petstype : ' + typeof (pets));
        console.log('pets[0]type : ' + typeof (pets[0]));
        console.log('pets[0] : ' + pets[0]);
        //console.log('############# : '+reqData[1].name)
        console.log('petsLength : ' + pets.length);
        console.log('petsName : ' + pets[0].name);
        console.log('petsKind : ' + pets[0].kind);
        console.log('userId : ' + userId);
        try {
            //error handling
            const findUser = yield User_1.default.findById(reqData.userId);
            console.log('findUser : ' + findUser);
            //console.log('image : '+images[0])
            let pets = [];
            const startDate = new Date(reqData[0].startDate);
            startDate.setDate(startDate.getDate() + 1);
            for (let i = 0; i < reqData.pets.length; i++) {
                let pet = new Pet_1.default({
                    name: reqData.pets[i].name,
                    kind: reqData.pets[i].kind,
                    gender: reqData.pets[i].gender,
                    imgs: "asdasd",
                    user: mongoose.Types.ObjectId(reqData.userId),
                    rainbow: false,
                    startDate: new Date(startDate)
                    // findUser, UserId만 해서 되면 가능
                    //book://나중에 책을 등록할때, pet에 book을 등록. 연관관계 확인. 안들어가있는게 있으면 나중에 같이 넣어야됨.
                    //SETTER사용. pet 찾아서 setter로 넣기.
                });
                yield pet.save();
                findUser.pets.push(pet);
                pets[i] = pet;
            }
            yield findUser.save();
            console.log(reqData);
            //db save
            const saveInfo = pets.map(pet => pet._id);
            return saveInfo;
        }
        catch (err) {
            console.log(err);
            throw { statusCode: statusCode.INTERNAL_SERVER_ERROR, responseMessage: responseMessage.INTERNAL_SERVER_ERROR };
        }
    }),
    // registerPetImg:async(image,petImageInfo)=>{
    //     try{
    //         for(let i=0;i<petImageInfo.length;i++){
    //             await Pet.update({_id:petImageInfo[i]},{$set : {imgs:image[i]}})
    //         }
    //         console.log('!!!! : '+image)
    //     }catch(err){
    //         throw err
    //     }
    // }
};
//# sourceMappingURL=petService.js.map