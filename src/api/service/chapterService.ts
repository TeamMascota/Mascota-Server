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

            const findFirstTableContents = await FirstPartTableContents.findById(chapterId).populate({ path: "petDiary", populate: ({ path: "petEmotions pets" }) });
            //.populate({path:"petDiary",populate:({path:"petEmotions"})})
            console.log('!!!! : '+findFirstTableContents)
            let newChapterDiary = new PetChapterDiaryResDto(findFirstTableContents)
            console.log("newchapterDiary",newChapterDiary);
            //월별로 자르기
            for (let m = 12; m >0; m--) {
                let cnt = 0;
                //1화부터
                let monthly = new MonthlyDiaryResDto()
                
                for (let i = findFirstTableContents.petDiary.length-1; i >=0 ; i--) {
                    console.log(findFirstTableContents.petDiary[i].date.getMonth())
                    if (m == findFirstTableContents.petDiary[i].date.getMonth()+1) {
                        cnt++;
                        console.log("month",m,findFirstTableContents.petDiary[i])
                        let newDiary = new DiariesResDto(findFirstTableContents.petDiary[i])//diary                     
                        monthly.setDiaries(newDiary)
                        console.log("출력 다이어리 : ",newDiary)
                        //console.log(findFirstTableContents.petDiary[i].petEmotions[0].feeling)
                    }
                }
                if (cnt == 0) continue
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
            newFirstPartTable.chapter = max + 1
            newFirstPartTable.title = chapterTitle

            await newFirstPartTable.save()
            findUserChapter.book.tableContents.firstPartTableContents.push(newFirstPartTable)
            let newTableContents = new TableContents(findUserChapter.book.tableContents)
            await newTableContents.save()

            console.log(newTableContents)
            let chapterList = new ChapterListResDto()
            for (let i = 0; i < findUserChapter.book.tableContents.firstPartTableContents.length; i++) {
                let newChapter = new ChapterResDto(new FirstPartTableContents(findUserChapter.book.tableContents.firstPartTableContents[i]))
                chapterList.setChapterList(newChapter)
            }
            console.log(chapterList)

            return chapterList;
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

            let chapterList = new ChapterListResDto()
            let tableContents=await TableContents.find({}).populate('firstPartTableContents')
            for (let i = 0; i < tableContents[0].firstPartTableContents.length; i++) {
                let newChapter = new ChapterResDto(new FirstPartTableContents(tableContents[0].firstPartTableContents[i]))
                chapterList.setChapterList(newChapter)
            }

         //   console.log(chapterList)

            return chapterList;
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
            let updateFTC = new FirstPartTableContents()
            //해당 목차보다 큰 목차 -=1
            for (let i = 0; i < allFirstTableContents.length; i++) {
                if (allFirstTableContents[i].chapter > curChapter) {
                    allFirstTableContents[i].chapter = Number(allFirstTableContents[i].chapter) - 1;
                }
                //db save
                updateFTC = allFirstTableContents[i]
                await updateFTC.save()
            }
            console.log(allFirstTableContents)

            //해당 목차 삭제
            await FirstPartTableContents.deleteOne({ _id: chapterId })

            const tableContents = (await TableContents.find())[0]
            for (let j = 0; j < tableContents.firstPartTableContents.length; j++) {
                if (tableContents.firstPartTableContents[j] == chapterId) {
                    tableContents.firstPartTableContents.splice(j, 1)
                }
            }
            await tableContents.save()


            let chapterList = new ChapterListResDto()
            let allTableContents=await TableContents.find({}).populate('firstPartTableContents')
            for (let i = 0; i < allTableContents[0].firstPartTableContents.length; i++) {
                let newChapter = new ChapterResDto(new FirstPartTableContents(allTableContents[0].firstPartTableContents[i]))
                chapterList.setChapterList(newChapter)
            }
            console.log(chapterList)

            return chapterList;
        }
        catch (err) {
            console.log(err)
            throw { statusCode: statusCode.BAD_REQUEST, responseMessage: responseMessage.NO_CONTENTS }
        }
    }
}
