import mongoose,{Document, Model} from "mongoose"

export interface IComments extends Document{
    _id : mongoose.Types.ObjectId;
    feeling : Number;
    comments : String;
    classification : Number;
}

export interface ICommentsDocument extends IComments{

}

export interface ICommentsModel extends Model<ICommentsDocument>{
    
}