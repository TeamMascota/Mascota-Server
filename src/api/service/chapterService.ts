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
    getChapterDiary: async (chapterId) => {
        try {
            //챕터 id로 1부 목차
            //findFirstTableContents 
            const findFirstTableContents= await FirstPartTableContents.findById(chapterId).populate('petDiary');
            //for 문으로 1장부터
            for(let i=0;i<findFirstTableContents.petDiary.length;i++){
            //월별로 자르기
            


            }

            //월별로 자르기
            //총 몆화
            //let petDiaryPageResDto = await new PetDiaryPageResDto(findPetDiary) //이부분
            
        } catch (err) {
            console.log(err)
            throw { statusCode: statusCode.BAD_REQUEST, responseMessage: responseMessage.NO_DIARY }
        }
    }
}
