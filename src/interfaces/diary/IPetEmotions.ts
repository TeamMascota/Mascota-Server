import mongoose,{Document, Model} from "mongoose"
import { IPet } from "../pet/IPet"
import {IPetDiary} from "./IPetDiary"

export interface IPetEmotions extends Document{
    _id : mongoose.Types.ObjectId;
    petDiary : mongoose.Types.ObjectId | IPetDiary;
    pet : mongoose.Types.ObjectId | IPet;
}

export interface IPetEmotionsDocument extends IPetEmotions{

}

export interface IPetEmotionsModel extends Model<IPetEmotionsDocument>{
    
}