import mongoose,{Document, Model} from "mongoose"
import {IPetEmotions} from "./IPetEmotions"

export interface IPetDiary extends Document{
    _id : mongoose.Types.ObjectId;
    chapter : Number;
    title : String;
    contents : String;
    petDiary : Array<IPetDiary>;
}

export interface IPetDiaryDocument extends IPetDiary{

}

export interface IPetDiaryModel extends Model<IPetDiaryDocument>{
    
}