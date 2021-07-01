import mongoose,{Document, Model} from "mongoose"

export interface IFirstPartTableContents extends Document{
    _id : mongoose.Types.ObjectId;
    
}

export interface IFirstPartTableContentsDocument extends IFirstPartTableContents{

}

export interface IFirstPartTableContentsModel extends IFirstPartTableContentsDocument{
    
}