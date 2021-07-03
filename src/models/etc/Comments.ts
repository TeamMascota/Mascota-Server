import mongoose, { Schema } from "mongoose"
import { IComments, ICommentsDocument, ICommentsModel } from "../../interfaces/etc/IComments"

const CommentsSchema: Schema<IComments> = new mongoose.Schema({
    feeling: { type: Number },
    comments: { type: String },
    classification: { type: Number }
})

export default mongoose.model<ICommentsDocument, ICommentsModel>("Comments", CommentsSchema, "comments")