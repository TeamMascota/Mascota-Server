import mongoose from "mongoose"
import { GetSchoolDto } from "./getSchoolDto"
import { ISchool } from "../interfaces/ISchool"
import { IUser } from "../interfaces/IUser"

export class GetUserInfoDto{
    private _id
    private name
    private school

    constructor(user : IUser , school : ISchool){
        this._id = user._id
        this.name = user.name
        this.school = new GetSchoolDto(school._id, school.name)
    }
}