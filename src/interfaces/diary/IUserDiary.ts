import mongoose,{Document, Model} from "mongoose"
import { IBook } from "../book/IBook"
import { ISecondPartTableContents } from "../tableContents/ISecondPartTableContents"
import { ITableContents } from "../tableContents/ITableContents"

export interface IUserDiary extends Document{
    _id : mongoose.Types.ObjectId;
    title : String;
    contents : String;
    imgs : [String];
    feeling : Number;
    tableContents : ISecondPartTableContents;
    date : Date;
}

export interface IUserDiaryDocument extends IUserDiary{
    setTableContents : (tableContents : ITableContents) => Promise<void>
}

export interface IUserDiaryModel extends Model<IUserDiaryDocument>{
    
}