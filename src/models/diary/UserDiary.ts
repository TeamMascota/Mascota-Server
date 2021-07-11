import mongoose,{Schema} from "mongoose"
import { IUserDiaryDocument, IUserDiaryModel } from "../../interfaces/diary/IUserDiary"
import { ISecondPartTableContents } from "../../interfaces/tableContents/ISecondPartTableContents"

const UserDiarySchema : Schema<IUserDiaryDocument> = new mongoose.Schema({
    title : { type : String},
    contents : {type : String},
    imgs : [
        {
            type : String,
            default : []
        }
    ],
    feeling : {type : Number},
    tableContents : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "SecondPartTableContents"
    },
    episode : {
        type : Number,
        default : 0
    },
    date : {
        type : Date,
        default : Date.now()
    }
})

UserDiarySchema.methods.setTableContents = async function(tableContents : ISecondPartTableContents){
    this.tableContents = tableContents
}

export default mongoose.model<IUserDiaryDocument, IUserDiaryModel>("UserDiary",UserDiarySchema,"userDiaries")