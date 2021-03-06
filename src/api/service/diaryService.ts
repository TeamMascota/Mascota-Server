import { response } from "express"
import User from "../../models/user/User"
import Book from "../../models/book/Book"
import TableContents from "../../models/tableContents/TableContents"
import FirstPartTableContents from "../../models/tableContents/FirstPartTableContents"
import Pet from "../../models/pet/Pet"
import PetDiary from "../../models/diary/PetDiary"
import PetEmotions from "../../models/diary/PetEmotions"
import { FeelingListDto, PetDiaryPageResDto } from "../../dto/petDiary/PetDiaryPageResDto"
require("../../models/user/User")
require("../../models/book/Book")
require("../../models/pet/Pet")
require('../../models/tableContents/TableContents')
require('../../models/tableContents/FirstPartTableContents')
require('../../models/diary/PetDiary')
require('../../models/diary/PetEmotions')
const util = require('../../modules/util')
const responseMessage = require('../../modules/responseMessage')
const statusCode = require('../../modules/statusCode')

module.exports = {
    postPrologue: async (userId, bookData) => {
        try {
            console.log(userId)
            //Create user object
            const user = await User.findById(userId).populate('book')
            console.log('user : ' + user)
            console.log('userBook : '+user.book)
            if(user.book.title != null){
                throw {statusCode : 404, responseMessage : "이미 책이 존재합니다, 없던일로 하겠습니다. 휴먼"}
            }
            const setBook = user.book
            setBook.title = bookData.title,
            setBook.imgs = "https://watcha.s3.ap-northeast-2.amazonaws.com/images/origin/%EC%B1%85+%EC%9D%B4%EB%AF%B8%EC%A7%80.jpg",
            setBook.author = bookData.userName

            //Create tableContents object
            const tableContents = new TableContents()
            setBook.tableContents = tableContents
            await tableContents.save()
            await user.save()
            await setBook.save()
            //Create firstPartTableContents object
            const firstPartPrologue = new FirstPartTableContents({
                chapter: 0,
                title: bookData.title,
                contents: bookData.contents
            })
            await firstPartPrologue.save()
            console.log(tableContents)
            await tableContents.firstPartTableContents.push(firstPartPrologue)

            let chapter = 1
            const season = ["봄", "여름", "가을", "겨울"]
            for (let i = 0; i < 4; i++) {
                const dummyFirstPartTableContents = new FirstPartTableContents({
                    chapter,
                    title: `${user.book.author}의 ${season[i]}`
                })
                await dummyFirstPartTableContents.save()
                tableContents.firstPartTableContents.push(dummyFirstPartTableContents)
                chapter = chapter + 1
            }

            //add dummy Diary
            let newPetDiary = new PetDiary({
                tableContents: tableContents.firstPartTableContents[1],
                episode: tableContents.firstPartTableContents[1].petDiary.length,
                //date: Date(),
                //imgs: diaryImages,
                title: "행복한 나날들",
                contents: "반려동물과의 일상을 생생하게 기록해보세요"
            })
            newPetDiary.setPet(user.pets[0])
            const petEmotion = new PetEmotions({
                pet: user.pets[0]._id,
                feeling: 3
            })
            newPetDiary.setPetEmotions(petEmotion)

            tableContents.firstPartTableContents[1].petDiary.push(newPetDiary)
            await petEmotion.save()
            await newPetDiary.save()
            await tableContents.firstPartTableContents[1].save()
            await tableContents.save()

            return user.book._id
            //error handling
        } catch (err) {
            console.log(err)
            throw err
        }
    },
    postPetDiary: async (diaryData) => {
        const writeDate = await new Date(diaryData.date)
        writeDate.setDate(writeDate.getDate() + 1);
        // console.log(FirstPartTableContents.findById(diaryData._id))
        const temp = await FirstPartTableContents.findById(diaryData._id).populate('petDiary')
        //console.log("temp:",temp,"end")
        let newPetDiary = new PetDiary({
            tableContents: diaryData._id,
            episode: temp.petDiary.length,
            date: writeDate,
            imgs: "https://watcha.s3.ap-northeast-2.amazonaws.com/images/origin/%EC%B1%85+%EC%9D%B4%EB%AF%B8%EC%A7%80.jpg",
            title: diaryData.title,
            contents: diaryData.contents

        })

        try {
            //save petinfo
            let petN = diaryData.character.length
            for (let i = 0; i < petN; i++) {
                const petData = await Pet.findById(diaryData.character[i]._id).populate('_id')
                newPetDiary.setPet(petData)
                //save emotions
                const petEmotion = new PetEmotions({
                    pet: diaryData.character[i]._id,
                    feeling: diaryData.character[i].feeling
                })
                newPetDiary.setPetEmotions(petEmotion)
                await petEmotion.save()
            }

            console.log(newPetDiary)
            await newPetDiary.save()

            await temp.setPetDiary(newPetDiary) //db관련은 await 붙이기(setter,save...)
            await temp.save()
            console.log(temp._id)
            return responseMessage.SUCCESS_POST_PETDIARY;

        } catch (err) {
            console.log(err)
            throw { statusCode: statusCode.BAD_REQUEST, responseMessage: responseMessage.NO_DIARY }
        }
    },
    getPetDiary: async (petDiaryId) => {
        try {
            const findPetDiary = await PetDiary.findById(petDiaryId).populate('pets').populate('tableContents').populate('petEmotions');
            let petDiaryPageResDto = await new PetDiaryPageResDto(findPetDiary) //이부분
            // console.log("feelingList",findPetDiary.pets[0],";",findPetDiary.petEmotions[0].feeling)

            for (let i = 0; i < findPetDiary.petEmotions.length; i++) {
                let feelingList = new FeelingListDto(findPetDiary.pets[i])
                feelingList.setFeeling(findPetDiary.petEmotions[i])
                petDiaryPageResDto.setFeelingList(feelingList)
            }
            return petDiaryPageResDto

        } catch (err) {
            console.log(err)
            throw { statusCode: statusCode.BAD_REQUEST, responseMessage: responseMessage.NO_DIARY }
        }
    },
    putPetDiary: async (petDiaryId, diaryData) => {
        try {
            let findPetDiary = await PetDiary.findById(petDiaryId);
            findPetDiary.tableContents = findPetDiary.tableContents
            findPetDiary.episode = findPetDiary.episode
            findPetDiary.date = findPetDiary.date
            findPetDiary.imgs = diaryData.diaryImages
            findPetDiary.title = diaryData.title
            findPetDiary.contents = diaryData.contents
            //save petinfo
            let petN = diaryData.character.length
            for (let i = 0; i < petN; i++) {
                const petData = await Pet.findById(diaryData.character[i]._id).populate('_id')
                findPetDiary.setPet(petData)
                //save emotions
                let emotion = new PetEmotions()
                emotion.pet = diaryData.character[i]._id
                emotion.feeling = diaryData.character[i].feeling
                emotion.setPetDiary(findPetDiary)
                await emotion.save()
            }
            await findPetDiary.save()
            return responseMessage.SUCCESS_EDIT_PETDIARY;

        } catch (err) {
            console.log(err)
            throw { statusCode: statusCode.BAD_REQUEST, responseMessage: responseMessage.NO_DIARY }
        }
    },
    deletePetDiary: async (petDiaryId) => {
        try {
            let findPetDiary = await PetDiary.findById(petDiaryId).populate('tableContents').populate('petEmotions');
            console.log('!!!!! : ' + findPetDiary)
            //화 정렬 순서 맞추기
            //해당 목차인것들 모두 가져오기. findPetDiary의 idx 뒤로 다 -1
            // let allDiaries=await (PetDiary.find({}).populate('tableContents'))
            let thisDiariesTableContent = findPetDiary.tableContents
            for (let j = 0; j < thisDiariesTableContent.petDiary.length; j++) {
                if (thisDiariesTableContent.petDiary[j]._id == petDiaryId) {
                    thisDiariesTableContent.petDiary.splice(j, 1)
                }
            }
            let petDiaries = (await FirstPartTableContents.findOne({ chapter: { $eq: findPetDiary.tableContents.chapter } })).petDiary

            for (let i = 0; i < petDiaries.length; i++) {
                let temp = await PetDiary.findById(petDiaries[i])
                if (findPetDiary.episode <= temp.episode) {
                    temp.episode = Number(temp.episode) - 1
                    await temp.save()
                }
            }

            findPetDiary.petEmotions.forEach(async petEmotion => {
                await PetEmotions.deleteOne({ _id: petEmotion._id })
            })

            await PetDiary.deleteOne({ _id: findPetDiary })
            await thisDiariesTableContent.save()
            console.log(findPetDiary)
            return responseMessage.SUCCESS_DELETE_PETDIARY;
        } catch (err) {
            console.log(err)
            throw { statusCode: statusCode.BAD_REQUEST, responseMessage: responseMessage.NO_DIARY }
        }
    },
    postPetDiaryWithImage:async(images, diaryInfo)=>{
        const petInfo = JSON.parse(JSON.stringify(diaryInfo.character)).character

        console.log('test2 : '+JSON.parse(petInfo))
        console.log('test ! : '+JSON.parse(JSON.stringify(petInfo)))
        console.log('images : '+images)
        console.log('diaryInfo : '+petInfo)
        console.log('diaryInfo : '+typeof(petInfo))
        console.log('diaryInfo length : '+petInfo.length)
        try{
            console.log('title : '+diaryInfo.title)
            console.log('content : '+diaryInfo.contents)
            console.log('date : '+diaryInfo.date)
            console.log('tableContents_id : '+diaryInfo._id)

            const writeDate = await new Date(diaryInfo.date)
            writeDate.setDate(writeDate.getDate() + 1);

            const firstTableContents = await FirstPartTableContents.findById(diaryInfo._id).populate('petDiary')
            const episode = firstTableContents.petDiary.length

            let newDiary = new PetDiary({
                title : diaryInfo.title,
                contents : diaryInfo.contents,
                imgs : images,
                episode ,
                date : writeDate
            })//set petEmotions, pets, tableContents
            firstTableContents.setPetDiary(newDiary)

            //petEmotion 생성 & 
            petInfo.forEach(async info => {
                //const perPet = await Pet.findById(info._id)
                let newEmotion = new PetEmotions({
                    pet : info._id,
                    feeling : info.feeling
                })//set petDiary
                newEmotion.setPetDiary(newDiary)
                newDiary.setPet(info._id)
                newDiary.setPetEmotions(newEmotion)

                await newEmotion.save()
            })
            newDiary.setTableContents(firstTableContents)

            await firstTableContents.save()
            await newDiary.save()

        }catch(err){
            throw err
        }
    }
}