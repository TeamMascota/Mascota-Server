import mongoose,{Schema} from "mongoose"
import {ISoptDocument, ISoptModel} from "../interfaces/ISopt"
import {IUser} from "../interfaces/IUser"

const SoptSchema : Schema<ISoptDocument> = new mongoose.Schema({
    part : {type : String},
    grade : {type : String},
    user : {type : mongoose.SchemaTypes.ObjectId, ref : "User"}
})

SoptSchema.methods.setUser = async function(user : IUser){
    this.user = user._id
}

// SoptSchema.methods.getTransferType = async function(){
//     return this.user as IUser
// }

export default mongoose.model<ISoptDocument, ISoptModel>("Sopt", SoptSchema,"sopts")