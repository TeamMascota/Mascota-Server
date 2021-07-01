import mongoose, {Document, Model}from "mongoose"
import {IPet} from "../pet/IPet"

export interface IUser extends Document{
    _id : mongoose.Types.ObjectId;
    email : String;
    password : String;
    pets : Array<IPet>;//Array(Pet)
    book : mongoose.Types.ObjectId;
}

export interface IUserDocument extends IUser{

}

export interface IUserModel extends Model<IUserDocument>{

}