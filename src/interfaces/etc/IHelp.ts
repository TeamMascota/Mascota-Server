import mongoose,{Document, Model} from "mongoose"

export interface IHelp extends Document{
    _id : mongoose.Types.ObjectId;
    classification : String;
    title : String;
}

export interface IHelpDocument extends IHelp{

}

export interface IHelpModel extends Model<IHelpDocument>{
    
}