import mongoose,{Document, Model} from "mongoose"
import { IBook } from "../book/IBook"
import { ISecondPartTableContents } from "../tableContents/ISecondPartTableContents"

export interface IUserDiary extends Document{
    _id : mongoose.Types.ObjectId;
    title : String;
    contents : String;
    imgs : Array<String>;
    feeling : Number;
    tableContents : mongoose.Types.ObjectId | ISecondPartTableContents;
    date : Date;
    book : mongoose.Types.ObjectId | IBook; //userDiary에서 book이 왜 필요할까?
}

export interface IUserDiaryDocument extends IUserDiary{

}

export interface IUserDiaryModel extends Model<IUserDiaryDocument>{
    
}