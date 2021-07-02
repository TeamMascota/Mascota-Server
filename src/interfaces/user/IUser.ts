import mongoose, {Document, Model}from "mongoose"
import { IBook } from "../book/IBook"
import {IPet} from "../pet/IPet"

export interface IUser extends Document{
    _id : mongoose.Types.ObjectId;
    email : String;
    password : String;
    pets : [IPet];
    book : [IBook];
}

export interface IUserDocument extends IUser{
    setPet : (pet : IPet) => Promise<void>
    setBook : (book : IBook) => Promise<void>
}

export interface IUserModel extends Model<IUserDocument>{

}