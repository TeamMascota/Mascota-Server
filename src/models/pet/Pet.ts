import mongoose, { Schema } from "mongoose"
import { IUserDocument, IUserModel } from "../../interfaces/user/IUser"
import { IPet } from "../../interfaces/pet/IPet"
import { IBook } from "../../interfaces/book/IBook"

const UserSchema: Schema<IUserDocument> = new mongoose.Schema({
    name : {type : String},
    kind : {type : Number},
    gender : {type : Number},
    imgs : {type : Array<String>},
    user : {type : mongoose.SchemaTypes.ObjectId, ref : "User"},
    book : [
        {
            type : mongoose.SchemaTypes.ObjectId, 
            ref : "Book:"
        }
    ]
})

UserSchema.methods.setPet = async function (pet : IPet) {
    this.pets.push(pet)
}

UserSchema.methods.setBook = async function (book : IBook) {
    this.book.push(book._id)
}

export default mongoose.model<IUserDocument, IUserModel>("User", UserSchema, "users")