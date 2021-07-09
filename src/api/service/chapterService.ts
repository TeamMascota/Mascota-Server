import Book from "../../models/book/Book"
import TableContents from "../../models/tableContents/TableContents"
import FirstPartTableContents from "../../models/tableContents/FirstPartTableContents"
import Pet from "../../models/pet/Pet"
import { response } from "express"
import PetDiary from "../../models/diary/PetDiary"
import PetEmotions from "../../models/diary/PetEmotions"
import { DiariesResDto, MonthlyDiaryResDto, PetChapterDiaryResDto } from "../../dto/petChapter/PetChapterDiary"
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
    getChapterDiary: async (chapterId) => {
        try {
            //챕터 id로 1부 목차
            //findFirstTableContents 
            const findFirstTableContents = await FirstPartTableContents.findById(chapterId).populate({path:"petDiary",populate:({path:"petEmotions"})});
            //.populate({path:"petDiary",populate:({path:"petEmotions"})})
            let newChapterDiary = new PetChapterDiaryResDto(findFirstTableContents)
            //월별로 자르기
            for (let m = 1; m <= 12; m++) {
                let cnt = 0;
                //1화부터
                let monthly = new MonthlyDiaryResDto()
                for (let i = 0; i < findFirstTableContents.petDiary.length; i++) {
                    if (m == findFirstTableContents.petDiary[i].date.getMonth()) {
                        cnt++;
                        let newDiary = new DiariesResDto(findFirstTableContents.petDiary[i])//diary                     
                        monthly.setDiaries(newDiary)
                        console.log(findFirstTableContents.petDiary[i].petEmotions[0].feeling)
                    }
                }
                monthly.setMonthCount(cnt)
                monthly.setMonth(m)
                newChapterDiary.setMonthly(monthly)
            }
            console.log(newChapterDiary)
            return newChapterDiary

        } catch (err) {
            console.log(err)
            throw { statusCode: statusCode.BAD_REQUEST, responseMessage: responseMessage.NO_DIARY }
        }
    }
}
