import mongoose,{Document, Model} from "mongoose"

export interface IInstitution extends Document{
    _id : mongoose.Types.ObjectId;
    feeling : Number;
    type : Number;
    contents : String;
    url : String;
}

export interface IInstitutionDocument extends IInstitution{

}

export interface IInstitutionModel extends Model<IInstitutionDocument>{
    
}