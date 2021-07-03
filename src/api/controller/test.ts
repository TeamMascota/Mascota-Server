import express from "express"
import User from "../../models/user/User"
import Pet from "../../models/pet/Pet"

require("../models/user/User")
require("../models/pet/Pet")


const router = express.Router()

router.get("/",async(req,res)=>{
    try{
        const user = new User({
            email : "test@gmail.com",
            password : "asdsasd",
        })
        const pet = new Pet({
            name : "코봉",
            kind : 1,
            gender : 1,
            imgs : ["asdasd","asdasd"],
        })
        const saveUser = await user.save()
        const savePet = await pet.save()

        await saveUser.setPet(pet)
        await savePet.setUser(saveUser)

        const result1 = await saveUser.save()
        const result2 = await savePet.save()

        console.log('saveUser : '+result1)
        console.log('savePet : '+ result2)
        res.status(200).send()
    }catch(error){
        console.error(error.message);
        res.status(500).send("Server Error")
    }
})

module.exports = router