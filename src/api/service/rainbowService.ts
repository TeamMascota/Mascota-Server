import User from "../../models/user/User"
import Pet from "../../models/pet/Pet"
import RainbowMainPageResDto from "../../dto/rainbow/mainPageDto/rainbowMainPageResDto"
require("../../models/user/User")
require("../../models/pet/Pet")

module.exports = {
    getMainPage : async(userId, petId) => {
        try{
            const findUser = await User.findById(userId).populate({
                path : "pets"
            }).populate({
                path : "book"
            })

            
        }catch(error){
            throw error
        }
    }
}