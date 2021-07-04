import mongoose,{Document, Model} from "mongoose"
import { ISecondPartTableContents } from "../tableContents/ISecondPartTableContents"

export interface IUserDiary extends Document{
    _id : mongoose.Types.ObjectId;
    title : String;
    contents : String;
    imgs : Array<String>;
    feeling : Number;
    tableContents : ISecondPartTableContents;
    date : Date;
}

export interface IUserDiaryDocument extends IUserDiary{
    setTableContents : (tableContents : ISecondPartTableContents) => Promise<void>
}

export interface IUserDiaryModel extends Model<IUserDiaryDocument>{
    
}