import mongoose, { Schema } from "mongoose"
import { IPetDiary } from "../../interfaces/diary/IPetDiary"
import { IPetEmotions, IPetEmotionsDocument, IPetEmotionsModel } from "../../interfaces/diary/IPetEmotions"

const PetEmotionsSchema: Schema<IPetEmotions> = new mongoose.Schema({
    petDiary: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "PetDiary"
    },
    pet: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Pet"
    }
})

PetEmotionsSchema.methods.setPetDiary = async function (petDiary: IPetDiary) {
    this.petDiary = petDiary
}

export default mongoose.model<IPetEmotionsDocument, IPetEmotionsModel>("PetEmotions", PetEmotionsSchema, "petEmotions")