import mongoose,{Document, Model} from "mongoose";

export interface ISchool extends Document{
    _id ?: mongoose.Types.ObjectId
    name : String,
    user : mongoose.Types.ObjectId
}

export interface ISchoolDocument extends ISchool{
    setName : (name : String) => Promise<void>
    setUser : (user : mongoose.Types.ObjectId) => Promise<void>
}

export interface ISchoolModel extends Model<ISchoolDocument>{

}