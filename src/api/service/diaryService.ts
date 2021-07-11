import User from "../../models/user/User"
import Book from "../../models/book/Book"
import TableContents from "../../models/tableContents/TableContents"
import FirstPartTableContents from "../../models/tableContents/FirstPartTableContents"
import Pet from "../../models/pet/Pet"
import { response } from "express"
import PetDiary from "../../models/diary/PetDiary"
import PetEmotions from "../../models/diary/PetEmotions"
import { PetDiaryPageResDto } from "../../dto/petDiary/PetDiaryPageResDto"
import { TIMEOUT } from "dns"
require("../../models/user/User")
require("../../models/book/Book")
require("../../models/pet/Pet")
require('../../models/tableContents/TableContents')
require('../../models/tableContents/FirstPartTableContents')
require('../../models/diary/PetDiary')
const util = require('../../modules/util')
const responseMessage = require('../../modules/responseMessage')
const statusCode = require('../../modules/statusCode')

module.exports = {
    postPrologue: async (bookData) => {
        try {
            // add book info
            let book = await Book.findById(bookData._id);
            book.title = bookData.title;
            book.imgs = bookData.image;
            book.author = bookData.userName;
            console.log(book)
            //add tableContents info
            let tc = await new TableContents();
            let ftc = await new FirstPartTableContents({
                chapter: 0,
                title: bookData.prologueTitle,
                contents: bookData.prologueContents
            })

            await tc.setFirstPartTableContents(ftc);
            await book.setTableContents(tc);
            //save db
            await book.save()

            return responseMessage.SUCCESS_POST_PROLOGUE;

            //error handling
        } catch (err) {
            console.log(err)
            throw { statusCode: statusCode.BAD_REQUEST, responseMessage: responseMessage.NO_BOOK }
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
            imgs: diaryData.diaryImages,
            title: diaryData.title,
            contents: diaryData.contents

        })

        try {
            //save petinfo
            let petN = diaryData.character.length
            for (let i = 0; i < petN; i++) {
                const petData = await Pet.findById(diaryData.character[0]._id).populate('_id')
                newPetDiary.setPet(petData)
                //save emotions
                const petEmotion = new PetEmotions({
                    pet: diaryData.character[0]._id,
                    feeling: diaryData.character[0].feeling
                })
                newPetDiary.setPetEmotions(petEmotion)
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
            for (let i = 0; i < findPetDiary.petEmotions.length; i++) {
                petDiaryPageResDto.setFeelingList(findPetDiary.petEmotions[i])
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
            let findPetDiary = await PetDiary.findById(petDiaryId).populate('tableContents');
            console.log(findPetDiary)
            //화 정렬 순서 맞추기
            //해당 목차인것들 모두 가져오기. findPetDiary의 idx 뒤로 다 -1
            // let allDiaries=await (PetDiary.find({}).populate('tableContents'))
            let petDiaries = (await FirstPartTableContents.findOne({ chapter: { $eq: findPetDiary.tableContents.chapter } })).petDiary

            for (let i = 0; i < petDiaries.length; i++) {
                let temp = await PetDiary.findById(petDiaries[i])
                if (findPetDiary.episode <= temp.episode) {
                    temp.episode = Number(temp.episode) - 1
                    await temp.save()
                }
            }
            await PetDiary.deleteOne({ _id: findPetDiary })
            console.log(findPetDiary)
            return responseMessage.SUCCESS_DELETE_PETDIARY;
        } catch (err) {
            console.log(err)
            throw { statusCode: statusCode.BAD_REQUEST, responseMessage: responseMessage.NO_DIARY }
        }
    }

}
