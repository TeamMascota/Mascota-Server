import User from "../../models/user/User"
import Book from "../../models/book/Book"
import TableContents from "../../models/tableContents/TableContents"
import FirstPartTableContents from "../../models/tableContents/FirstPartTableContents"
import Pet from "../../models/pet/Pet"
import { response } from "express"
import PetDiary from "../../models/diary/PetDiary"
import PetEmotions from "../../models/diary/PetEmotions"
import { PetDiaryPageResDto } from "../../dto/petDiary/PetDiaryPageResDto"
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
            let book = await new Book();
            book = await Book.findById(bookData._id);
            book.title = await bookData.title;
            book.imgs = await bookData.image;
            book.author = await bookData.userName;

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
        const writeDate = new Date(diaryData.date)
        writeDate.setDate(writeDate.getDate() + 1);
        // console.log(FirstPartTableContents.findById(diaryData._id))

        let newPetDiary = new PetDiary({
            tableContents: diaryData._id,
            //episode:FirstPartTableContents.findById(diaryData._id).length, 이부분 수정하기
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

            //     let findPet=new Pet()
            //     findPet=Pet.findById(diaryData.character[i]._id)
            //     newPetDiary.setPet(findPet)
            // }
            //console.log(petData)
        } catch (err) {
            console.log(err)
        }
    },
    getPetDiary: async (petDiaryId) => {
        try {
            const findPetDiary = PetDiary.findById(petDiaryId);
            //let petDiaryPageResDto = await new PetDiaryPageResDto(findPetDiary) 이부분
            // return petDiaryPageResDto
        } catch (err) {
            console.log(err)
            //throw err, noPetDiaryId
        }
    },
    putPetDiary: async (petDiaryId, diaryData) => {
        try {
            const findPetDiary = PetDiary.findById(petDiaryId);
            const writeDate = new Date(diaryData.date)
            writeDate.setDate(writeDate.getDate() + 1);
            // console.log(FirstPartTableContents.findById(diaryData._id))

            let newPetDiary = new PetDiary({
                tableContents: diaryData._id,
                //episode:FirstPartTableContents.findById(diaryData._id).length, 이부분 수정하기
                date: writeDate,
                imgs: diaryData.diaryImages,
                title: diaryData.title,
                contents: diaryData.contents

            })
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


        } catch (err) {
            console.log(err)
        }

    },
    deletePetDiary:async(petDiaryId)=>{
        try{
            const findPetDiary=PetDiary.findById(petDiaryId);
            //화 정렬 순서 맞추기
            //해당 목차인것들 모두 가져오기. findPetDiary의 idx 뒤로 다 -1
        }
    }
    
}
