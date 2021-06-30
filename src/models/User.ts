import mongoose from "mongoose"
import {IUserDocument, IUserModel} from "../interfaces/IUser"

const UserSchema = new mongoose.Schema({
    name : {type : String},
    school : {type : mongoose.SchemaTypes.ObjectId, ref : "School"},
    sopt : {type : mongoose.SchemaTypes.ObjectId, ref : "Sopt"}
})

export default mongoose.model<IUserDocument, IUserModel>("User", UserSchema,"users")