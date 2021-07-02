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

router.post("/", async (req, res) => {
    const { name, schoolName } = req.body;

    try {
        //user Init save
        const user = new User({
            name
        })
        const saveUser = await user.save()

        //find saveUser Id
        const saveUserId = saveUser._id

        //school save with userId
        const school = new School({
            name: schoolName,
            user: saveUserId
        })
        const saveSchool = await school.save()

        //update userObject ReSave
        saveUser.setSchool(saveSchool)
        const result = await saveUser.save()

        console.log("saveSchool : " + saveSchool)
        console.log("finalUser : " + result)

        res.status(200).send(result)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
})

router.get("/",async(req,res)=>{
    const userId = "60db00564abd6608dcc8d6af";
    let aqaa =asdasdasd;
    aqaa = 1231245
    try{
        const user = await User.findById(userId).populate({
            path:"sopt"
        })
        console.log('user : '+user)
        console.log('findUser_Sopt : '+user.sopt)
        console.log('soptType : '+typeof(user.sopt))
        console.log('sopt_field : '+user.sopt.part)
        
        res.status(200).send(user.sopt)
    }catch(error){
        console.error(error.message);
        res.status(500).send("Server Error")
    }
})

module.exports = router