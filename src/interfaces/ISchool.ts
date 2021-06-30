import mongoose,{Document, Model} from "mongoose";

export interface ISchool{
    name : {type: String},
    user : {type: mongoose.Types.ObjectId}
}

export interface ISchoolDocument extends ISchool, Document{

}

export interface ISchoolModel extends Model<ISchoolDocument>{

}