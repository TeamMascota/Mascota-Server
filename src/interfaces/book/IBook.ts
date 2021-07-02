import mongoose, { Document, Model } from "mongoose"
import { ITableContents } from "../tableContents/ITableContents"

export interface IBook extends Document {
    _id: mongoose.Types.ObjectId;
    title: String;
    author: String;
    imgs: Array<String>;
    part: Number;
    tableContents: mongoose.Types.ObjectId;
}

export interface IBookDocument extends IBook {
    setTableContents : (tableContents : ITableContents) => Promise<void>
}

export interface IBookModel extends Model<IBookDocument> {

}