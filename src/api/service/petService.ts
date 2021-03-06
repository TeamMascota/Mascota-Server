import { Request, Response, NextFunction } from 'express'
import User from '../../models/user/User'
import Pet from '../../models/pet/Pet'
import { PetInfoDto, PetsInfoDto } from '../../dto/rainbow/petDto/PetInfoDto'
import { SavePetResDto } from '../../dto/petDiary/SavePetResDto'
const responseMessage = require('../../modules/responseMessage')
const statusCode = require('../../modules/statusCode')
const util = require('../../modules/util')
const petService = require('../service/petService')
var mongoose = require('mongoose')

require("../../models/user/User")
require("../../models/pet/Pet")
module.exports = {
    getPetInfo:async()=>{
        try{
            const findUser = await User.find().populate({
                path : "pets"
            })
            console.log('getPetInfo List')
            const findPets = findUser[0].pets

            return new PetsInfoDto(findPets.map( pet => new PetInfoDto(pet)))

        }catch(error){
            throw error
        }
    },
    registerPet: async (reqData) => {
        const {pets, userId} = reqData
        
        console.log('petstype : '+typeof(pets))
        console.log('pets[0]type : '+typeof(pets[0]))
        console.log('pets[0] : '+JSON.stringify(pets[0]))
        //console.log('############# : '+reqData[1].name)
        console.log('petsLength : '+pets.length)
        console.log('petsName : '+pets[0].name)
        console.log('petsKind : '+pets[0].startDate)
        console.log('userId : '+userId)
        try{
        //error handling
            const findUser = await User.findById(userId)
            console.log('findUser : '+findUser)
            //console.log('image : '+images[0])
            let petsArr=[];
            const startDate= new Date(pets[0].startDate)
            startDate.setDate(startDate.getDate() + 1);
            for (let i = 0; i < pets.length; i++) {
                let pet = new Pet({
                    name: pets[i].name,
                    kind: pets[i].kind,
                    gender: pets[i].gender,
                    imgs : "https://watcha.s3.ap-northeast-2.amazonaws.com/images/origin/%EC%B1%85+%EC%9D%B4%EB%AF%B8%EC%A7%80.jpg",
                    user: mongoose.Types.ObjectId(userId),
                    rainbow: false,
                    startDate: new Date(startDate)
    
                   // findUser, UserId??? ?????? ?????? ??????
                    //book://????????? ?????? ????????????, pet??? book??? ??????. ???????????? ??????. ????????????????????? ????????? ????????? ?????? ????????????.
                    //SETTER??????. pet ????????? setter??? ??????.
                });
                await pet.save()
                findUser.pets.push(pet)
                petsArr[i]=pet;
            }
            await findUser.save()
            console.log(reqData);
            //db save
            const saveInfo = petsArr.map(pet=>pet._id)
            return new SavePetResDto(saveInfo)
        }catch(err){
            console.log(err)
            throw { statusCode: statusCode.INTERNAL_SERVER_ERROR, responseMessage: responseMessage.INTERNAL_SERVER_ERROR };
        }
    }
}