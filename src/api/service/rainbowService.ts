import User from "../../models/user/User"
import { RainbowMainPageResDto, MemoriesResDto, HelpResDto } from "../../dto/rainbow/mainPageDto/RainbowMainPageResDto"
import Help from "../../models/etc/Help"
import { MyPetInfoResDto } from "../../dto/rainbow/petDto/RainbowPetResDto"
import Pet from "../../models/pet/Pet"
import { PartingRainbowResDto } from "../../dto/rainbow/partingDto/PartingRainbowResDto"
import { ReadyPartingAndStartRecordResDto,BookInfoResDto } from "../../dto/rainbow/readyPartingAndStartRecordDto/readyPartingAndStartRecordResDto"
const dateMethod = require("../../modules/dateMethod")

require("../../models/user/User")
require("../../models/pet/Pet")
require("../../models/book/Book")
require('../../models/tableContents/TableContents')
require('../../models/tableContents/FirstPartTableContents')
require('../../models/diary/PetDiary')
require('../../models/diary/PetEmotions')
require('../../models/tableContents/SecondPartTableContent')
require('../../models/diary/UserDiary')
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
                    populate: {
                        path: "firstPartTableContents",
                        populate: {
                            path: "petDiary",
                            populate: {
                                path: "petEmotions"
                            }
                        }
                    }
                }
            })

            const rainbowMainPageResDto = new RainbowMainPageResDto(findUser.book)
            const firstPartTableContents = findUser.book.tableContents.firstPartTableContents

            const validMemories = firstPartTableContents.filter(tableContents =>
                tableContents.petDiary.length > 0).map(tableContents =>
                    tableContents.petDiary.filter(petDiary =>
                        petDiary.pets.includes(petId))
                )
            //validMemories : [tableContetns [petDiary]]

            let memoriesResDto = [null, null]

            if (validMemories.length == 2) {
                memoriesResDto[0] = new MemoriesResDto(validMemories[0], petId)
                memoriesResDto[1] = new MemoriesResDto(validMemories[1], petId)
            } else if (validMemories.length > 2) {
                let firstTableContentsIndex = await getRandomNumber(validMemories.length)
                let secondTableContentsIndex = await getRandomNumber(validMemories.length)

                if (firstTableContentsIndex == secondTableContentsIndex) {
                    while (firstTableContentsIndex == secondTableContentsIndex) {
                        if (secondTableContentsIndex == firstTableContentsIndex) {
                            secondTableContentsIndex = await getRandomNumber(validMemories.length)
                        } else {
                            break;
                        }
                    }
                }
                memoriesResDto[0] = new MemoriesResDto(validMemories[firstTableContentsIndex], petId)
                memoriesResDto[1] = new MemoriesResDto(validMemories[secondTableContentsIndex], petId)
            } else if (validMemories.length == 1) {
                memoriesResDto[0] = new MemoriesResDto(validMemories[0], petId)
            }
            rainbowMainPageResDto.setMemories(memoriesResDto)

            //helpResDto
            const helps = await Help.find()
            const helpResDto = helps.map(help => new HelpResDto(help))

            rainbowMainPageResDto.setHelp(helpResDto)

            return rainbowMainPageResDto
        } catch (error) {
            throw error
        }

        function getRandomNumber(max: number) {
            max = Math.floor(max);
            return Math.floor(Math.random() * max);
        }
    },

    selectPet: async () => {
        try {
            const findUser = await User.find().populate({
                path: "pets"
            })
            const rainbowPetResDto = findUser[0].pets.map(pet =>
                new MyPetInfoResDto(pet))

            return rainbowPetResDto
        } catch (err) {
            throw err
        }
    },

    setPartingRainbowPet: async (petId) => {
        try {
            const findPet = await Pet.findById(petId).populate({
                path : "user",
                populate : {
                    path : "book",
                    populate : {
                        path : "tableContents",
                        populate : {
                            path : "firstPartTableContents"
                        }
                    }
                }
            })
            findPet.rainbow = true
            await findPet.save()
            const user = findPet.user
            let diaryCount = 0
            user.book.tableContents.firstPartTableContents.forEach(tableContent =>
                diaryCount += tableContent.petDiary.length)

            return new PartingRainbowResDto(diaryCount,findPet.name)
        } catch (err) {
            throw err
        }
    },

    getReadyPartingPetComment: async(petId) =>{
        try{
            const pet = await Pet.findById(petId).populate({
                path : "user",
                populate : {
                    path : "book",
                    populate : {
                        path : "tableContents",
                        populate : {
                            path : "firstPartTableContents"
                        }
                    }
                }
            })

            const user = pet.user
            const bookInfo = new BookInfoResDto(pet.user.book)
            let diaryCount = 0
            user.book.tableContents.firstPartTableContents.forEach(tableContent =>
                diaryCount += tableContent.petDiary.length)

            const startDate = pet.startDate
            const dayTogether = await dateMethod.getElapsedDay(startDate)
            
            return new ReadyPartingAndStartRecordResDto(diaryCount, dayTogether, bookInfo)
        }catch(err){
            throw err
        }
    }
}