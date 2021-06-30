import mongoose,{Document, Model} from "mongoose";

export interface IUser{
    name : {type: String},
    school : {type:mongoose.Types.ObjectId}
    sopt : {type: mongoose.Types.ObjectId}
}

export interface IUserDocument extends IUser, Document{

}

export interface IUserModel extends Model<IUserDocument>{

}