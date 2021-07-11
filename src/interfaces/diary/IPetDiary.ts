import mongoose,{Document, Model} from "mongoose"
import {IPetEmotions} from "./IPetEmotions"
import {IPet} from "../pet/IPet"
import { IFirstPartTableContents } from "../tableContents/IFirstPartTableContents"
import { ITableContents } from "../tableContents/ITableContents"

export interface IPetDiary extends Document{
    _id : mongoose.Types.ObjectId;
    pets : Array<IPet>;
    tableContents : IFirstPartTableContents;
    title : String;
    contents : String;
    imgs : Array<String>;
    petEmotions : Array<IPetEmotions>;
    episode : number;
    date : Date; 
}

export interface IPetDiaryDocument extends IPetDiary{
    setPet : (pet : IPet) => Promise<void>
    setTableContents : (tableContents : ITableContents) => Promise<void>
    setPetEmotions : (petEmotions : IPetEmotions) => Promise<void>
}

export interface IPetDiaryModel extends Model<IPetDiaryDocument>{
    
}