import Book from "../../models/book/Book"
import TableContents from "../../models/tableContents/TableContents"
import FirstPartTableContents from "../../models/tableContents/FirstPartTableContents"
import Pet from "../../models/pet/Pet"
import { response } from "express"
import PetDiary from "../../models/diary/PetDiary"
import PetEmotions from "../../models/diary/PetEmotions"
import { DiariesResDto, MonthlyDiaryResDto, PetChapterDiaryResDto } from "../../dto/petChapter/PetChapterDiary"
import User from "../../models/user/User"
import { ChapterListResDto, ChapterResDto } from "../../dto/petChapter/ChapterList"
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
            const findFirstTableContents = await FirstPartTableContents.findById(chapterId).populate({ path: "petDiary", populate: ({ path: "petEmotions" }) });
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
                        //console.log(findFirstTableContents.petDiary[i].petEmotions[0].feeling)
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
    },
    getChapterList: async (userId) => {
        const findUserChapter = await User.findById(userId).populate({ path: "book", populate: ({ path: "tableContents", populate: ({ path: "firstPartTableContents" }) }) });
        let chapterList = new ChapterListResDto()
        for (let i = 0; i < findUserChapter.book.tableContents.firstPartTableContents.length; i++) {
            let newChapter = new ChapterResDto(new FirstPartTableContents(findUserChapter.book.tableContents.firstPartTableContents[i]))
            chapterList.setChapterList(newChapter)
        }
        console.log(chapterList)
        return chapterList
    },
    postChapterList: async (userId, chapterTitle) => {
        try {
            const findUserChapter = await User.findById(userId).populate({ path: "book", populate: ({ path: "tableContents", populate: ({ path: "firstPartTableContents" }) }) });
            const newFirstPartTable = new FirstPartTableContents();//chapter,title
            console.log(findUserChapter)
            console.log(chapterTitle)
            let max = 0

            for (let i = 0; i < findUserChapter.book.tableContents.firstPartTableContents.length; i++) {
                if (max < findUserChapter.book.tableContents.firstPartTableContents[i].chapter) {
                    max = Number(findUserChapter.book.tableContents.firstPartTableContents[i].chapter)
                }
            }
            newFirstPartTable.chapter = max
            newFirstPartTable.title = chapterTitle

            await newFirstPartTable.save()
            findUserChapter.book.tableContents.firstPartTableContents.push(newFirstPartTable)
            let newTableContents = new TableContents(findUserChapter.book.tableContents)
            await newTableContents.save()

            console.log(newTableContents)

            return responseMessage.SUCCESS_POST_CHAPTERLIST;
        } catch (err) {
            console.log(err)
            throw { statusCode: statusCode.BAD_REQUEST, responseMessage: responseMessage.NO_CONTENTS }
        }
    },
    putChapterList: async (chapterId, chapterTitle) => {
        try {
            const findChapter = await FirstPartTableContents.findById(chapterId);
            findChapter.title = chapterTitle
            const editFirstPartTableContents = new FirstPartTableContents(findChapter)
            await editFirstPartTableContents.save()
            console.log(editFirstPartTableContents)

            return responseMessage.SUCCESS_PUT_CHAPTERLIST;
        }
        catch (err) {
            console.log(err)
            throw { statusCode: statusCode.BAD_REQUEST, responseMessage: responseMessage.NO_CONTENTS }
        }
    },
    deleteChapterList: async (chapterId) => {
        try {
            let findChapter = await FirstPartTableContents.findById(chapterId);
            const curChapter = findChapter.chapter
            const allFirstTableContents = await FirstPartTableContents.find({});
            let updateFTC=new FirstPartTableContents()
            //해당 목차보다 큰 목차 -=1
            for (let i = 0; i < allFirstTableContents.length; i++) {
                if (allFirstTableContents[i].chapter > curChapter) {
                    allFirstTableContents[i].chapter = Number(allFirstTableContents[i].chapter) - 1;
                }
                //db save
                updateFTC=allFirstTableContents[i]
                await updateFTC.save()
            }
            console.log(allFirstTableContents)

            //해당 목차 삭제
            findChapter=null;
            return responseMessage.SUCCESS_DELETE_CHAPTERLIST;
        }
        catch (err) {
            console.log(err)
            throw { statusCode: statusCode.BAD_REQUEST, responseMessage: responseMessage.NO_CONTENTS }
        }
    }
}
