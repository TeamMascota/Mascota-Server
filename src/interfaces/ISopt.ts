import mongoose,{Document, Model} from "mongoose";

export interface ISopt{
    part : {type: String},
    grade : {type: String},
    user : {type: mongoose.Types.ObjectId}
}

export interface ISoptDocument extends ISopt, Document{

}

export interface ISoptModel extends Model<ISoptDocument>{

}