import mongoose,{Schema} from "mongoose"
import { IPetDiary, IPetDiaryDocument, IPetDiaryModel } from "../../interfaces/diary/IPetDiary"
import {IPet} from "../../interfaces/pet/IPet"
import { IPetEmotions } from "../../interfaces/diary/IPetEmotions"
import { IFirstPartTableContents } from "../../interfaces/tableContents/IFirstPartTableContents"

const PetDiarySchema : Schema<IPetDiary>= new mongoose.Schema({
    pets : [
        {
            type : mongoose.SchemaTypes.ObjectId,
            ref : "Pet"
        }
    ],
    tableContents : {
        type : mongoose.SchemaTypes.ObjectId,
        ref: "FirstPartTableContents"
    },
    title : {type : String},
    contents : {type : String},
    imgs : [
        {
            type : String
        }
    ],
    petEmotions : [
        {
            type : mongoose.SchemaTypes.ObjectId,
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

PetDiarySchema.methods.setTableContents = async function(tableContents : IFirstPartTableContents){
    this.tableContents = tableContents
}

PetDiarySchema.methods.setPetEmotions = async function(petEmotions : IPetEmotions){
    this.petEmotions.push(petEmotions)
}

export default mongoose.model<IPetDiaryDocument, IPetDiaryModel>("PetDiarySchema", PetDiarySchema, "petDiarySchema")