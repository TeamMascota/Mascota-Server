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

//과제1
router.get('/:id', async (req, res) => {
    const soptId = req.params.id
    try {
        const sopt = await Sopt.findById(soptId).populate('user', 'name school')

        const user = await User.findById(sopt.user)
        const getUserNameDto = new GetUserNameDto(user._id, user.name)

        res.status(200).send(getUserNameDto)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
})

router.get('/multi/:id', async(req,res)=>{
    const soptId = req.params.id

    try{
        const findUserSopt = await Sopt.findById(soptId).populate({
            path:'user',
            populate : {path:'school'}
        })
        const transferUser = findUserSopt.user as IUser  //이렇게 따로 형변환하는거 말고 날오때 형이 변환되는방법은 없을까?
        const transferSchool = transferUser.school as ISchool
        
        //DB에서 찾은 user가 IUser인터페이스에서 objectId로 선언되어있어서 user안에 있는 값을 못읽어오는듯
        const result = new GetUserInfoDto(transferUser, transferSchool)

        res.status(200).send(result)
    }catch(error){
        console.error(error.message);
        res.status(500).send("Server Error")
    }
})

module.exports = router