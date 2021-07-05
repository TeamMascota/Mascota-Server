import mongoose, { Schema } from "mongoose"
import { ITableContents, ITableContentsDocument, ITableContentsModel } from "../../interfaces/tableContents/ITableContents"
import { IFirstPartTableContents } from "../../interfaces/tableContents/IFirstPartTableContents"
import { ISecondPartTableContents } from "../../interfaces/tableContents/ISecondPartTableContents"

const TableContentsSchema: Schema<ITableContents> = new mongoose.Schema({
    firstPartTableContents: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "FirstPartTableContents"
        }
    ],
    secondPartTableContents: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "SecondPartTableContents"
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