import { Request, Response, NextFunction } from 'express'
import User from '../../models/user/User'
import Pet from '../../models/pet/Pet'
const responseMessage = require('../../modules/responseMessage')
const statusCode = require('../../modules/statusCode')
const util = require('../../modules/util')
const petService = require('../service/petService')
var mongoose = require('mongoose')

require("../../models/user/User")
require("../../models/pet/Pet")
module.exports = {
    registerPet: async (reqData, images) => {
        try{
        //error handling
            const findUser = await User.findById(reqData.userId)

            let pets=[];
            const startDate= new Date(reqData.pets[0].startDate)
            startDate.setDate(startDate.getDate() + 1);
            for (let i = 0; i < reqData.pets.length; i++) {
                let pet = new Pet({
                    name: reqData.pets[i].name,
                    kind: reqData.pets[i].kind,
                    gender: reqData.pets[i].gender,
                    imgs : images[i],
                    user: mongoose.Types.ObjectId(reqData.userId),
                    rainbow: false,
                    startDate: new Date(startDate)
    
                   // findUser, UserId만 해서 되면 가능
                    //book://나중에 책을 등록할때, pet에 book을 등록. 연관관계 확인. 안들어가있는게 있으면 나중에 같이 넣어야됨.
                    //SETTER사용. pet 찾아서 setter로 넣기.
                });
                await pet.save()
                findUser.pets.push(pet)
                pets[i]=pet;
            }
            await findUser.save()
            console.log(reqData);
            //db save
            const saveInfo = pets.map(pet=>pet._id)
            return saveInfo
        }catch(err){
            console.log(err)
            throw { statusCode: statusCode.INTERNAL_SERVER_ERROR, responseMessage: responseMessage.INTERNAL_SERVER_ERROR };
        }
    },

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
}