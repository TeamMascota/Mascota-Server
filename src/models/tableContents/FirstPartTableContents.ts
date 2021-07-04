import mongoose, { Schema } from "mongoose"
import { IFirstPartTableContents, IFirstPartTableContentsDocument, IFirstPartTableContentsModel } from "../../interfaces/tableContents/IFirstPartTableContents"
import { IPetDiary } from "../../interfaces/diary/IPetDiary"

const FirstPartTableContentsSchema: Schema<IFirstPartTableContents> = new mongoose.Schema({
    chapter: { 
        type: Number 
    },
    title: { 
        type: String 
    },
    contents: { 
        type: String,
        default : null
    },
    petDiary: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "PetDiary"
        }
    ]
})

FirstPartTableContentsSchema.methods.setPetDiary = async function (petDiary: IPetDiary) {
    this.petDiary.push(petDiary)
}

export default mongoose.model<IFirstPartTableContentsDocument, IFirstPartTableContentsModel>("FirstPartTableContents", FirstPartTableContentsSchema, "firstPartTableContents")