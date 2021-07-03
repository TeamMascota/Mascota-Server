import express from "express"
import User from "../models/User"
import School from "../models/School"
import Sopt from "../models/Sopt"
import { GetUserNameDto } from "../dto/getUserNameDto"
import { GetUserInfoDto } from "../dto/getUserInfoDto"
import { IUser } from "../interfaces/IUser"
import { ISchool } from "../interfaces/ISchool"
require("../models/School")
require("../models/User")
require("../models/Sopt")


const router = express.Router()


module.exports = router