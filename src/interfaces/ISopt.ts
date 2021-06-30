import mongoose,{Document, Model} from "mongoose";
import {IUser} from "./IUser"

export interface ISopt extends Document{
    _id ?: mongoose.Types.ObjectId
    part : String,
    grade : String,
    user : mongoose.Types.ObjectId
}

export interface ISoptDocument extends ISopt{
    setUser : (name : IUser) => Promise<void>
}

export interface ISoptModel extends Model<ISoptDocument>{

}