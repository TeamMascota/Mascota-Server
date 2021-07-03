import mongoose, { Schema } from "mongoose"
import { IUserDocument, IUserModel } from "../../interfaces/user/IUser"
import { IPet } from "../../interfaces/pet/IPet"
import { IBook } from "../../interfaces/book/IBook"

const UserSchema: Schema<IUserDocument> = new mongoose.Schema({
    email: { type: String },
    password: { type: String },
    pets: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Pet"
        }
    ],
    book: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Book"
    },
    feelingCount: { type: Number }
})

UserSchema.methods.setPet = async function (pet: IPet) {
    this.pets.push(pet)
}

UserSchema.methods.setBook = async function (book: IBook) {
    this.book = book
}

export default mongoose.model<IUserDocument, IUserModel>("User", UserSchema, "users")