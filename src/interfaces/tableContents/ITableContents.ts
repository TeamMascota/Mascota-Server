import mongoose, { Document, Model } from "mongoose"
import { IFirstPartTableContents } from "./IFirstPartTableContents";
import { ISecondPartTableContents } from "./ISecondPartTableContents";


export interface ITableContents extends Document {
    _id: mongoose.Types.ObjectId;
    firstPartTableContents : [IFirstPartTableContents];
    secondPartTableContents : [ISecondPartTableContents];
}

export interface ITableContentsDocument extends ITableContents {
    setFirstPartTableContents : (tableContents : IFirstPartTableContents) => Promise<void>
    setSecondPartTableContents : (tableContents : ISecondPartTableContents) => Promise<void>
}

export interface ITableContentsModel extends Model<ITableContentsDocument> {

}