import mongoose,{Document, Model} from "mongoose";
import {ISchool} from "./ISchool"
import {ISopt} from "./ISopt"

export interface IUser extends Document{
    _id : mongoose.Types.ObjectId
    name : String
    school : mongoose.Types.ObjectId | ISchool
    sopt : mongoose.Types.ObjectId
}

export interface IUserDocument extends IUser{
    setSchool : (school : ISchool) => Promise<void>
    setSopt : (sopt : mongoose.Types.ObjectId) => Promise<void>
}

export interface IUserModel extends Model<IUserDocument>{

}