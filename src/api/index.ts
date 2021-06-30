import express from "express"
import User from "../models/User"
import School from "../models/School"
import Sopt from "../models/Sopt"
require("../models/School")
require("../models/User")
require("../models/Sopt")


const router = express.Router()


module.exports = router