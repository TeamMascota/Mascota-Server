import SecondPartTableContent from "../../models/tableContents/SecondPartTableContent"
import PetDiary from "../../models/diary/PetDiary"
import UserDiary from "../../models/diary/UserDiary"
import User from "../../models/user/User"
import Book from "../../models/book/Book"
import { SecondPartMainPageResDto, SecondPartMainPageTableContents } from "../../dto/secondPart/SecondPartMainPageResDto"
import { SecondPartDiariesOfMonth, SecondPartDiariesOfMonthResDto } from "../../dto/secondPart/SecondPartDiariesOfMonthResDto"
import { SecondPartChapterListResDto } from "../../dto/secondPart/SecondPartChapterListResDto"
const dateMethod = require("../../modules/dateMethod")

require('../../models/tableContents/FirstPartTableContents')
require('../../models/tableContents/SecondPartTableContent')
require('../../models/diary/PetDiary')
require('../../models/diary/UserDiary')
require('../../models/diary/PetEmotions')
require('../../models/book/Book')

module.exports = {
    getMainPage: async (userId) => {
        try {
            const user = await User.findById(userId).populate({
                path: "book",
                populate: ({
                    path: "tableContents",
                    populate: ({
                        path: "secondPartTableContents",
                        populate: ({
                            path: "userDiary"
                        })
                    })
                })
            })

            const epilogue = user.book.tableContents.secondPartTableContents[0]
            const checkFirst = user.book.tableContents.secondPartTableContents.map(tableContents => tableContents.userDiary)
            let check = false
            checkFirst.forEach(x => {
                if (x.length > 1) check = true
            })

            let sortSecondPartTableContents = []
            if (check) {
                sortSecondPartTableContents = user.book.tableContents.secondPartTableContents.filter(secondPartTableContents =>
                    secondPartTableContents.userDiary.length > 1).sort((a, b) =>
                        b.chapter - a.chapter
                    )[0].userDiary.sort((a, b) =>
                        b.episode - a.episode
                    )
            } else {
                sortSecondPartTableContents.push({
                    nextEpisode: 1,
                    episode: 0,
                    title: epilogue.title,
                    contents: epilogue.contents,
                    date: user.book.tableContents.secondPartStartDate
                })
            }

            return new SecondPartMainPageResDto(user, sortSecondPartTableContents[0])
        } catch (err) {
            throw err
        }
    },

    getDiaryOfTableContents: async (tableContentsId) => {
        try{
            const tableContents = await SecondPartTableContent.findById(tableContentsId).populate({
                path : "userDiary"
            })
            const test = tableContents.userDiary.filter( userDiary =>
                userDiary.date.getMonth() == 6
            )

            const secondPartDiariesOfMonth : SecondPartDiariesOfMonth[]= []
            for(let i = 12 ; i >0 ;i--){
                if((tableContents.userDiary.map(diary=>diary.date.getMonth() == i)).includes(true)){
                    const filteringDiaries = tableContents.userDiary.filter(userDiary=>
                        userDiary.date.getMonth() == i)
                        secondPartDiariesOfMonth.push(new SecondPartDiariesOfMonth(i+1,filteringDiaries))
                }
            }

            return new SecondPartDiariesOfMonthResDto(tableContents, secondPartDiariesOfMonth)
        }catch(err){
            throw err
        }
    },

    getSecondPartChapterList:async()=>{
        try{
            const chapterList = await SecondPartTableContent.find()
            return new SecondPartChapterListResDto(chapterList)
        }catch(err){
            throw err
        }
    }
}