import mongoose, { Schema } from "mongoose"
import { IPetDocument, IPetModel } from "../../interfaces/pet/IPet"
import { IBook } from "../../interfaces/book/IBook"
import { IUser } from "../../interfaces/user/IUser"

const PetSchema: Schema<IPetDocument> = new mongoose.Schema({
    name: { type: String },
    kind: { type: Number },
    gender: { type: Number },
    imgs: [
        {
            type: String
        }
    ],
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    book: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Book:"
        }
    ]
})


PetSchema.methods.setUser = async function (user: IUser) {
    this.user = user
}

PetSchema.methods.setBook = async function (book: IBook) {
    this.book.push(book)
}

export default mongoose.model<IPetDocument, IPetModel>("Pet", PetSchema, "pets")