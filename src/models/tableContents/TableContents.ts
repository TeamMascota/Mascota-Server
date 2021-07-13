import mongoose, { Schema } from "mongoose"
import { ITableContentsDocument, ITableContentsModel } from "../../interfaces/tableContents/ITableContents"
import { IFirstPartTableContents } from "../../interfaces/tableContents/IFirstPartTableContents"
import { ISecondPartTableContents } from "../../interfaces/tableContents/ISecondPartTableContents"

const TableContentsSchema: Schema<ITableContentsDocument> = new mongoose.Schema({
    firstPartTableContents: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "FirstPartTableContents",
            default:[]
        }
    ],
    secondPartTableContents: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "SecondPartTableContents",
            default:[]
        }
    ],
    secondPartStartDate : {
        type : Date,
        default : Date.now()
    }
})

TableContentsSchema.methods.setFirstPartTableContents = async function (tableContents: IFirstPartTableContents) {
    this.firstPartTableContents.push(tableContents)
}

TableContentsSchema.methods.setSecondPartTableContents = async function (tableContents: ISecondPartTableContents) {
    this.secondPartTableContents.push(tableContents)
}

export default mongoose.model<ITableContentsDocument, ITableContentsModel>("TableContents", TableContentsSchema, "tableContents")