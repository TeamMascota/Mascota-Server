import mongoose from "mongoose"
import {ISoptDocument, ISoptModel} from "../interfaces/ISopt"

const SoptSchema = new mongoose.Schema({
    part : {type : String},
    grade : {type : String},
    user : {type : mongoose.SchemaTypes.ObjectId, ref : "User"}
})

export default mongoose.model<ISoptDocument, ISoptModel>("Sopt", SoptSchema,"sopts")