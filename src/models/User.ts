import mongoose, { Schema } from "mongoose"
import { IUserDocument, IUserModel } from "../interfaces/IUser"
import { ISchool } from "../interfaces/ISchool"
import { ISopt } from "../interfaces/ISopt"

const UserSchema: Schema<IUserDocument> = new mongoose.Schema({
    name: { type: String },
    school: { type: mongoose.SchemaTypes.ObjectId, ref: "School" },
    sopt: { type: mongoose.SchemaTypes.ObjectId, ref: "Sopt" }
})

UserSchema.methods.setSchool = async function (school: ISchool) {
    this.school = school
}

UserSchema.methods.setSopt = async function (sopt: ISopt) {
    this.sopt = sopt
}

export default mongoose.model<IUserDocument, IUserModel>("User", UserSchema, "users")