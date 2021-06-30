import mongoose from "mongoose"
import {ISchoolDocument, ISchoolModel} from "../interfaces/ISchool"

const SchoolSchema = new mongoose.Schema({
    name : {type : String},
    user : {type : mongoose.SchemaTypes.ObjectId, ref : "User"}
})

// export default mongoose.model<ISchoolDocument, ISchoolModel>("School", SchoolSchema,"schools")
export default mongoose.model("School", SchoolSchema)