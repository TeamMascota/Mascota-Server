import mongoose,{Document, Model} from "mongoose"

export interface IComment extends Document{
    _id : mongoose.Types.ObjectId;
    feeling : Number;
    comment : String;
    classification : Number;
}

export interface ICommentDocument extends IComment{

}

export interface ICommentModel extends Model<ICommentDocument>{
    
}