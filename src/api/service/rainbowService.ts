import User from "../../models/user/User"
import { RainbowMainPageResDto, MemoriesResDto, HelpResDto, MemoriesResDto2 } from "../../dto/rainbow/mainPageDto/RainbowMainPageResDto"
import Help from "../../models/etc/Help"
import { MyPetInfoResDto, RainbowPetResDto } from "../../dto/rainbow/petDto/RainbowPetResDto"
import Pet from "../../models/pet/Pet"
import { IPet } from "../../interfaces/pet/IPet"
import { PartingRainbowResDto } from "../../dto/rainbow/partingDto/PartingRainbowResDto"
import { ReadyPartingAndStartRecordResDto, BookInfoResDto } from "../../dto/rainbow/readyPartingAndStartRecordDto/ReadyPartingAndStartRecordResDto"
import FirstPartTableContents from "../../models/tableContents/FirstPartTableContents"
import SecondPartTableContent from "../../models/tableContents/SecondPartTableContent"
import PetDiary from "../../models/diary/PetDiary"
import PetEmotions from "../../models/diary/PetEmotions"
import { TheBestMoment, TheBestMomentDiary, TheBestMomentsResDto, TheBestMomentPetInformation } from "../../dto/rainbow/theBestMomentDto/TheBestMomentResDto"
import { PetNameResDto } from "../../dto/rainbow/petDto/PetNameResDto"
import { IPetDiary } from "../../interfaces/diary/IPetDiary"
import Comments from "../../models/etc/Comments"
import { TheBestMomentSubResDto } from "../../dto/rainbow/theBestMomentDto/TheBestMomentSubResDto"
var dateMethod = require("../../modules/dateMethod")
var theBestMomentComments = require("../../modules/comment")

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
require("../../models/etc/Comments")

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
            const isRainbowPet = await isRainbow(findUser.pets)
            const rainbowButtonCheck = await rainbowCheck(findUser.pets)
            const rainbowMainPageResDto = new RainbowMainPageResDto(findUser.book, isRainbowPet, rainbowButtonCheck)
            const firstPartTableContents = findUser.book.tableContents.firstPartTableContents

            const validMemories = firstPartTableContents.filter(tableContents =>
                tableContents.petDiary.length > 0).map(tableContents =>
                    tableContents.petDiary.filter(petDiary =>
                        petDiary.pets.includes(petId))
                )[0]
            console.log('validMemories : '+ validMemories)
            console.log('!!!!!!!!!!!!!!!!!!!!! : '+validMemories[0])
            console.log('@@@@@@@@@@@@@@@@@@ : '+validMemories[1])
            //validMemories : [tableContetns [petDiary]]

            let memoriesResDto = [null, null]
                console.log('validMemoriesLength : '+validMemories.length)
            if (validMemories.length == 2) {
                memoriesResDto[0] = new MemoriesResDto(validMemories, petId)
                memoriesResDto[1] = new MemoriesResDto(validMemories, petId)
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
                console.log('firstTableContentsIndex : '+firstTableContentsIndex)
                console.log('secondTableCOntetnsIndex : '+secondTableContentsIndex)
                console.log('fisrt : '+validMemories[firstTableContentsIndex])
                console.log('second : '+validMemories[secondTableContentsIndex])
                memoriesResDto[0] = new MemoriesResDto2(validMemories[firstTableContentsIndex], petId)
                memoriesResDto[1] = new MemoriesResDto2(validMemories[secondTableContentsIndex], petId)
            } else if (validMemories.length == 1) {
                memoriesResDto[0] = new MemoriesResDto(validMemories[0][0], petId)
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
        function isRainbow(pets: IPet[]) {
            let rainbow = false
            pets.forEach(pet => {
                if (pet.rainbow === true) {
                    rainbow = true
                }
            })
            return rainbow
        }
        function rainbowCheck(pets: IPet[]) {
            let check = true
            pets.forEach(pet => {
                if (pet.rainbow === false) {
                    check = false
                }
            })
            return check
        }
    },

    selectPet: async () => {
        try {
            const findUser = await User.find().populate({
                path: "pets"
            })
            const rainbowPetResDto = new RainbowPetResDto(findUser[0].pets.filter(pet=>!pet.rainbow).map(pet =>
                new MyPetInfoResDto(pet)))

            return rainbowPetResDto
        } catch (err) {
            throw err
        }
    },

    setPartingRainbowPet: async (petId) => {
        try {
            const findPet = await Pet.findById(petId).populate({
                path: "user",
                populate: {
                    path: "book",
                    populate: {
                        path: "tableContents",
                        populate: {
                            path: "firstPartTableContents"
                        }
                    }
                }
            })
            findPet.rainbow = true
            await findPet.save()
            const user = findPet.user
            // for()

            let diaryCount = 0
            user.book.tableContents.firstPartTableContents.forEach(tableContent =>
                diaryCount += tableContent.petDiary.length)

            return new PartingRainbowResDto(diaryCount, findPet)
        } catch (err) {
            throw err
        }
    },

    cancelPartingPet: async (petId) => {
        try {
            const findPet = await Pet.findById(petId)
            findPet.rainbow = false
            await findPet.save()
        } catch (err) {
            throw err
        }
    },

    getReadyPartingPetComment: async (petId) => {
        try {
            const pet = await Pet.findById(petId).populate({
                path: "user",
                populate: {
                    path: "book",
                    populate: {
                        path: "tableContents",
                        populate: {
                            path: "firstPartTableContents"
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
        } catch (err) {
            throw err
        }
    },

    getTheBestMoment: async (userId, petId) => {
        try {
            const pet = await Pet.findById(petId)
            const TheBestMomentPetInfo = new TheBestMomentPetInformation(pet)
            const diaryPerFeeling = []
            for (let i = 0; i < 6; i++) {
                const diaries = (await PetEmotions.find({ "feeling": { $eq: i } }).select("petDiary").populate({ path: "petDiary", populate: ({ path: "tableContents" }) })).map(emotion => emotion.petDiary)
                if (diaries.length < 1) {
                    diaryPerFeeling.push(null)
                } else {
                    diaryPerFeeling.push(diaries)
                }
            }

            const theBestMomentsResDto = new TheBestMomentsResDto()
            for (let j = 0; j < 6; j++) {   //긍정3개, 부정3개
                const commentPerFeeling = await Comments.findOne({ feeling: j , classification : 2})

                // let commentPerFeeling ={
                //     comments : "",
                //     feeling : j
                // }
                // if(j==0){
                //     commentPerFeeling.comments = await theBestMomentComments.loveFeeling(pet.name)
                // }else if(j==1){
                //     commentPerFeeling = await theBestMomentComments.happyFeeling(pet.name)
                // }else if(j==2){
                //     commentPerFeeling = await theBestMomentComments.normalFeeling()
                // }else if(j==3){
                //     commentPerFeeling = await theBestMomentComments.angryFeeling(pet.name)
                // }else if(j==4){
                //     commentPerFeeling = await theBestMomentComments.gloomyFeeling()
                // }else if(j==5){
                //     commentPerFeeling = await theBestMomentComments.boringFeeling()
                // }

                let theBestMoment = null
                if (j < 3) {
                    theBestMoment = new TheBestMoment(commentPerFeeling, getPositiveRadomDiary(diaryPerFeeling[j]))
                } else {
                    theBestMoment = new TheBestMoment(commentPerFeeling, getNegativeRandomDiary(diaryPerFeeling[j]))
                }
                theBestMomentsResDto.setTheBestMoment(theBestMoment)
                theBestMomentsResDto.setTheBestMomentPetInfo(TheBestMomentPetInfo)
            }

            return theBestMomentsResDto
        } catch (err) {
            throw err
        }

        //각 기분에 따른 일기들을 배열로 묶어서 보내줘야함
        function getPositiveRadomDiary(diaries: IPetDiary[]) {
            if (diaries === null) return null
            const diaryLength = diaries.length
            const theBestMomentDiaries = []
            if (diaryLength < 8) {
                for (let i = 0; i < diaryLength; i++) { //가지고 있는 일기 갯수만큼만 넣는다
                    theBestMomentDiaries.push(new TheBestMomentDiary(diaries[i]))
                }
                for (let j = 0; j < 8 - diaryLength; j++) { //남은 일기갯수(8-가지고 있는 일기수)만큼 null로 채워준다
                    theBestMomentDiaries.push(null)
                }
            } else {
                //8개 이상의 일기중 8개만 골라서 넣어준다.
                const indexArray = []
                while (indexArray.length < 8) {
                    let index = getRandomNumber(diaryLength)
                    if (!indexArray.includes(index)) {
                        indexArray.push(index)
                    }
                }
                for (let k = 0; k < 8; k++) {
                    theBestMomentDiaries.push(new TheBestMomentDiary(diaries[indexArray[k]]))
                }
            }
            return theBestMomentDiaries
        }

        //부정 일기는 2개씩만
        function getNegativeRandomDiary(diaries: IPetDiary[]) {
            if (diaries === null) return null
            const diaryLength = diaries.length
            const theBestMomentDiaries = []
            if (diaryLength < 2) {
                for (let i = 0; i < diaryLength; i++) {
                    theBestMomentDiaries.push(new TheBestMomentDiary(diaries[i]))
                }
                for (let j = 0; j < 2 - diaryLength; j++) {
                    theBestMomentDiaries.push(null)
                }
            } else {
                const indexArray = []
                while (indexArray.length < 2) {
                    let index = getRandomNumber(diaryLength)
                    if (!indexArray.includes(index)) {
                        indexArray.push(index)
                    }
                }
                for (let k = 0; k < 2; k++) {
                    theBestMomentDiaries.push(new TheBestMomentDiary(diaries[indexArray[k]]))
                }
            }
            return theBestMomentDiaries
        }

        function getRandomNumber(max: number) {
            max = Math.floor(max);
            return Math.floor(Math.random() * max);
        }
    },

    getPartingPetName: async (petId) => {
        try {
            const pet = await Pet.findById(petId)
            return new PetNameResDto(pet)
        } catch (err) {
            throw err
        }
    },

    postEpilogue: async (userId, data) => {
        try {
            console.log('id : '+userId)
            const test = await User.findById(userId)
            console.log('test!!! : '+test)
            const user = await User.findById(userId).populate({
                path: "book",
                populate: ({
                    path: "tableContents",
                    populate: ({
                        path: "firstPartTableContents secondPartTableContents"
                    })
                })
            })
            console.log('user : '+user)
            const tableContents = user.book.tableContents

            //1부 목차 마지막에 에필로그
            const firstPartEpilogue = new FirstPartTableContents({
                chapter: -1,
                title: data.title,
                contents: data.contents
            })
            await firstPartEpilogue.save()
            await tableContents.firstPartTableContents.push(firstPartEpilogue)

            const isAlreadySecondPartTableContents = await SecondPartTableContent.find()//첫 반려동물이 무지개를 건넜는지 확인하기 위한 로직

            //2부 목차 처음에 에필로그
            const secondPartEpilogue = new SecondPartTableContent({
                chapter: 0,
                title: data.title,
                contents: data.contents
            })
            const saveSecondPartEpiogue = await secondPartEpilogue.save()
            await tableContents.secondPartTableContents.unshift(saveSecondPartEpiogue)

            if (isAlreadySecondPartTableContents.length < 1) {
                const season = ["봄", "여름", "가을", "겨울"]
                for (let i = 0; i < 4; i++) {
                    let chapter = 1
                    const dummySecondPartTableContents = new SecondPartTableContent({
                        chapter,
                        title: `${user.book.author}의 ${season[i]}`
                    })
                    const saveSecondPartEpiogue = await dummySecondPartTableContents.save()
                    await tableContents.secondPartTableContents.push(saveSecondPartEpiogue)
                    chapter = chapter + 1
                }
            }
            await tableContents.save()

            return user
        } catch (err) {
            throw err
        }
    },

    getTheBestMomentSub:async (petId,theBestMoment) =>{
        try{
            const pet = await Pet.findById(petId)
            return new TheBestMomentSubResDto(pet,theBestMoment)
        }catch(err){
            throw err
        }
    }
}