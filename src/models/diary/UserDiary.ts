import mongoose,{Schema} from "mongoose"
import { IUserDiaryDocument, IUserDiaryModel } from "../../interfaces/diary/IUserDiary"
import { ISecondPartTableContents } from "../../interfaces/tableContents/ISecondPartTableContents"

const UserDiarySchema : Schema<IUserDiaryDocument> = new mongoose.Schema({
    title : { type : String},
    contents : {type : String},
    imgs : [
        {
            type : String
        }
    ],
    feeling : {type : Number},
    tableContents : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "SecondPartTableContents"
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