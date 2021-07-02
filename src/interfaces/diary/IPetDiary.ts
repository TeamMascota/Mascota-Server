import mongoose,{Document, Model} from "mongoose"
import {IPetEmotions} from "./IPetEmotions"
import {IPet} from "../pet/IPet"
import { IFirstPartTableContents } from "../tableContents/IFirstPartTableContents"

export interface IPetDiary extends Document{
    _id : mongoose.Types.ObjectId;
    pets : Array<IPet | mongoose.Types.ObjectId>;
    tableContents : mongoose.Types.ObjectId | IFirstPartTableContents;
    title : String;
    contents : String;
    imgs : Array<String>;
    petEmotions : Array<IPetEmotions | mongoose.Types.ObjectId>;
    date : Date; 
}

export interface IPetDiaryDocument extends IPetDiary{

}

export interface IPetDiaryModel extends Model<IPetDiaryDocument>{
    
}