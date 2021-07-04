import User from "../../models/user/User"
import Pet from "../../models/pet/Pet"
import { RainbowMainPageResDto, MemoriesResDto, HelpResDto } from "../../dto/rainbow/mainPageDto/rainbowMainPageResDto"
import Help from "../../models/etc/Help"

require("../../models/user/User")
require("../../models/pet/Pet")
require("../../models/book/Book")
require('../../models/tableContents/TableContents')
require('../../models/tableContents/FirstPartTableContents')
require('../../models/tableContents/SecondPartTableContent')
require("../../models/etc/Help")

module.exports = {
    getMainPage: async (userId, petId) => {
        try {
            const findUser = await User.findById(userId).populate({
                path: "pets"
            }).populate({
                path: "book",
                populate: {
                    path: "tableContents",
                    populate: { path: "firstPartTableContents" }
                }
            })
            const findPet = await Pet.findById(petId);
            console.log(findUser)
            const firstPartTableContents = findUser.book.tableContents.firstPartTableContents
            console.log('tableContents : ' + firstPartTableContents)
            console.log('length : ' + firstPartTableContents.length)

            console.log('test :'+ firstPartTableContents[0].petDiary.length)
            //const validDiary = firstPartTableContents.filter(tableContents => tableContents.petDiary)
            let memoriesResDto = [null,null]
            // if(firstPartTableContents.length == 1){
            //     memoriesResDto[0] = new MemoriesResDto(firstPartTableContents,findPet)
            // }else{
            //     memoriesResDto = 
            // }
            //helpResDto
            const helps = await Help.find()
            const helResDto = helps.map(help => new HelpResDto(help))

            const result = findUser
            return result
        } catch (error) {
            throw error
        }
    },
}