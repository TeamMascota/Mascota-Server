import mongoose,{Document, Model} from "mongoose"
import {IPetDiary} from "../diary/IPetDiary"

export interface IFirstPartTableContents extends Document{
    _id : mongoose.Types.ObjectId;
    chapter : Number;
    title : String;
    contents : String;
    petDiary : Array<IPetDiary>;
}

export interface IFirstPartTableContentsDocument extends IFirstPartTableContents{

}

export interface IFirstPartTableContentsModel extends Model<IFirstPartTableContentsDocument>{
    
}