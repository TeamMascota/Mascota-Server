import mongoose, { Document, Model } from "mongoose"
import { IFirstPartTableContents } from "../tableContents/IFirstPartTableContents"
import { ISecondPartTableContents } from "../tableContents/ISecondPartTableContents"

export interface IBook extends Document {
    _id: mongoose.Types.ObjectId;
    title: String;
    author: String;
    imgs: Array<String>;
    part: Number;
    tableContents: Array<IFirstPartTableContents> | Array<ISecondPartTableContents>;
}

export interface IBookDocument extends IBook {

}

export interface IBookModel extends Model<IBookDocument> {

}