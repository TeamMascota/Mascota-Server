import express from "express"
import User from "../models/User"
import School from "../models/School"
import Sopt from "../models/Sopt"
require("../models/School")
require("../models/User")
require("../models/Sopt")


const router = express.Router()

router.post("/",async(req,res)=>{
    const soptId = "60db029b7f28e0386c203c41";

    try{
        const sopt = await Sopt.findById(soptId).populate({
            path:"user",
            populate : {path:"school"}
        })
        res.status(200).send(sopt)
    }catch(error){
        console.error(error.message);
        res.status(500).send("Server Error")
    }
})

module.exports = router