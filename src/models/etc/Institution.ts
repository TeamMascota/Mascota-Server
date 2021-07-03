import mongoose,{Schema} from "mongoose"
import { IInstitution, IInstitutionDocument, IInstitutionModel } from "../../interfaces/etc/IInstitution"

const InstitutionSchema: Schema<IInstitution> = new mongoose.Schema({
    feeling: { type: Number },
    type: { type: Number },
    contents: { type: String },
    url: { type: String }
})

export default mongoose.model<IInstitutionDocument, IInstitutionModel>("Institutions",InstitutionSchema,"institutions")