import mongoose, { Schema } from "mongoose"
import { IBookDocument, IBookModel } from "../../interfaces/book/IBook"
import { ITableContents } from "../../interfaces/tableContents/ITableContents"

const BookSchema: Schema<IBookDocument> = new mongoose.Schema({
    title: { type: String },
    author: { type: String },
    imgs: { type: String },
    tableContents: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "TableContents"
    },
    date : {
        type : Date,
        default : Date.now()
    }
})
BookSchema.methods.setTableContents=async function(tableContents: ITableContents){
    this.tableContents=tableContents
}

export default mongoose.model<IBookDocument, IBookModel>("Book", BookSchema, "books")