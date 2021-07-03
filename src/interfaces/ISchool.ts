import mongoose,{Document, Model} from "mongoose";
import { IUser } from "./IUser";

export interface ISchool extends Document{
    _id ?: mongoose.Types.ObjectId
    name : String,
    user : IUser
}

export interface ISchoolDocument extends ISchool{
    setName : (name : String) => Promise<void>
    setUser : (user : mongoose.Types.ObjectId) => Promise<void>
}

export interface ISchoolModel extends Model<ISchoolDocument>{

}