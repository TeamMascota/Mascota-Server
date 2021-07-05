import mongoose, { Schema } from "mongoose"
import { IHelpDocument, IHelpModel } from "../../interfaces/etc/IHelp"

const HelpSchema: Schema<IHelpDocument> = new mongoose.Schema({
    classification: { type: String },
    title: { type: String },
    url: { type: String }
})

export default mongoose.model<IHelpDocument, IHelpModel>("Help", HelpSchema, "helps")