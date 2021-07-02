import mongoose, { Schema } from "mongoose"
import { IFirstPartTableContentsDocument, IFirstPartTableContentsModel } from "../../interfaces/tableContents/IFirstPartTableContents"
import { IPetDiary } from "../../interfaces/diary/IPetDiary"

const FirstPartTableContentsSchema: Schema<IFirstPartTableContentsDocument> = new mongoose.Schema({
    chapter : {type : Number},
    title : {type : String},
    contents : {type : String},
    petDiary : [
        {
            type : mongoose.SchemaTypes.ObjectId,
            ref : "PetDiary"
        }
    ]
})

FirstPartTableContentsSchema.methods.setPetDiary = async function (petDiary: IPetDiary) {
    this.petDiary.push(petDiary)
}

export default mongoose.model<IFirstPartTableContentsDocument, IFirstPartTableContentsModel>("FirstPartTableContents", FirstPartTableContentsSchema, "firstPartTableContents")