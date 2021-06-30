import mongoose from "mongoose"

export interface IGetSchoolDto{
    _id : mongoose.Types.ObjectId
    name : String
}

export class GetSchoolDto{
    private _id
    private name

    constructor(_id : mongoose.Types.ObjectId, name : String){
        this._id = _id
        this.name = name
    }
}