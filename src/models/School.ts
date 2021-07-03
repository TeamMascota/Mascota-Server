import mongoose,{Schema} from "mongoose"
import {ISchoolDocument, ISchoolModel} from "../interfaces/ISchool"
import {IUser} from "../interfaces/IUser"

const SchoolSchema : Schema<ISchoolDocument> = new mongoose.Schema({
    name : {type : String},
    user : {type : mongoose.SchemaTypes.ObjectId, ref : "User"}
})

SchoolSchema.methods.setName = async function(name : String){
    this.name = name
}

SchoolSchema.methods.setUser = async function(user : IUser){
    this.user = user
}

export default mongoose.model<ISchoolDocument, ISchoolModel>("School", SchoolSchema,"schools")