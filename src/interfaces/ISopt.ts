import mongoose,{Document, Model} from "mongoose";
import {IUser} from "./IUser"

export interface ISopt extends Document{
    _id : mongoose.Types.ObjectId
    part : String,
    grade : String,
    user : IUser
}

export interface ISoptDocument extends ISopt{
    setUser : (user : IUser) => Promise<void>
    // getTransferType : () => Promise<IUser>
}

export interface ISoptModel extends Model<ISoptDocument>{

}