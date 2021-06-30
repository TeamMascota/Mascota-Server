import mongoose from "mongoose"

export class GetUserNameDto {
    private _id;
    private name;

    constructor(_id: mongoose.Types.ObjectId, name: String) {
        this._id = _id
        this.name = name
    }
}