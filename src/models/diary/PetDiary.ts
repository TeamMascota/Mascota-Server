import mongoose,{Schema} from "mongoose"
import { IPetDiary, IPetDiaryDocument, IPetDiaryModel } from "../../interfaces/diary/IPetDiary"
import {IPet} from "../../interfaces/pet/IPet"
import { IPetEmotions } from "../../interfaces/diary/IPetEmotions"

const PetDiarySchema : Schema<IPetDiary>= new mongoose.Schema({
    pets : [
        {
            type : mongoose.Types.ObjectId,
            ref : "Pet"
        }
    ],
    tableContents : {type : mongoose.Types.ObjectId},
    title : {type : String},
    contents : {type : String},
    imgs : [
        {
            type : String
        }
    ],
    petEmotions : [
        {
            type : mongoose.Types.ObjectId,
            ref : "PetEmotions"
        }
    ],
    date : { 
        type : Date,
        default : Date.now()
    }
})

PetDiarySchema.methods.setPet = async function(pet : IPet){
    this.pets.push(pet)
}

PetDiarySchema.methods.setPetEmotions = async function(petEmotions : IPetEmotions){
    this.petEmotions.push(petEmotions)
}

export default mongoose.model<IPetDiaryDocument, IPetDiaryModel>("PetDiarySchema", PetDiarySchema, "petDiarySchema")