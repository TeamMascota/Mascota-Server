import mongoose,{Schema} from "mongoose"
import { IInstitutionDocument, IInstitutionModel } from "../../interfaces/etc/IInstitution"

const InstitutionSchema: Schema<IInstitutionDocument> = new mongoose.Schema({
    feeling: { type: Number },
    type: { type: Number },
    contents: { type: String },
    url: { type: String }
})

export default mongoose.model<IInstitutionDocument, IInstitutionModel>("Institutions",InstitutionSchema,"institutions")