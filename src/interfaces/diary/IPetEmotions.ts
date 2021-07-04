import mongoose,{Document, Model} from "mongoose"
import { IPet } from "../pet/IPet"
import {IPetDiary} from "./IPetDiary"

export interface IPetEmotions extends Document{
    _id : mongoose.Types.ObjectId;
    petDiary : IPetDiary;
    pet : IPet;
    feeling : Number
}

export interface IPetEmotionsDocument extends IPetEmotions{
    setPetDiary : (petDiary : IPetDiary) => Promise<void>
    setPet : (pet : IPet) => Promise<void>
}

export interface IPetEmotionsModel extends Model<IPetEmotionsDocument>{
    
}