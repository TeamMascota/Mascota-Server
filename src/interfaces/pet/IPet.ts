import mongoose, { Document, Model } from "mongoose"
import { IUser } from "../user/IUser"
import { IBook } from "../book/IBook"

export interface IPet extends Document {
    _id: mongoose.Types.ObjectId;
    name: String;
    kind: Number;
    gender: Number;
    imgs: Array<String>;
    user: IUser;
    book: IBook;
    rainbow : Boolean;
    startDate: Date;
}

export interface IPetDocument extends IPet {
    setUser: (user: IUser) => Promise<void>
    setBook: (pet: IPet) => Promise<void>
}

export interface IPetModel extends Model<IPetDocument> {

}