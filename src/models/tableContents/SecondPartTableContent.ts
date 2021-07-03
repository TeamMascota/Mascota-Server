import mongoose, { Schema } from "mongoose"
import { IUserDiary } from "../../interfaces/diary/IUserDiary"
import { ISecondPartTableContentsDocument, ISecondPartTableContentsModel } from "../../interfaces/tableContents/ISecondPartTableContents"

const SecondPartTableContentsSchema: Schema<ISecondPartTableContentsDocument> = new mongoose.Schema({
    chapter: { type: Number },
    title: { type: String },
    startDate: {
        type: Date,
        default: Date.now()
    },
    userDiary: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "UserDiary"
        }
    ]
})

SecondPartTableContentsSchema.methods.setUserDiary = async function (userDiary: IUserDiary) {
    this.userDiary.push(userDiary)
}

export default mongoose.model<ISecondPartTableContentsDocument, ISecondPartTableContentsModel>("SecondPartTableContents", SecondPartTableContentsSchema, "secondPartTableContents")