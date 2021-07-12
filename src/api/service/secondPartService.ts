import SecondPartTableContent from "../../models/tableContents/SecondPartTableContent"
import PetDiary from "../../models/diary/PetDiary"
import UserDiary from "../../models/diary/UserDiary"
import User from "../../models/user/User"
import Book from "../../models/book/Book"
import { SecondPartMainPageResDto, SecondPartMainPageTableContents } from "../../dto/secondPart/SecondPartMainPageResDto"
import { SecondPartDiariesOfMonth, SecondPartDiariesOfMonthResDto } from "../../dto/secondPart/SecondPartDiariesOfMonthResDto"
import { SecondPartChapterListResDto } from "../../dto/secondPart/SecondPartChapterListResDto"
import TableContents from "../../models/tableContents/TableContents"
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
        try {
            const tableContents = await SecondPartTableContent.findById(tableContentsId).populate({
                path: "userDiary"
            })
            const test = tableContents.userDiary.filter(userDiary =>
                userDiary.date.getMonth() == 6
            )

            const secondPartDiariesOfMonth: SecondPartDiariesOfMonth[] = []
            for (let i = 12; i > 0; i--) {
                if ((tableContents.userDiary.map(diary => diary.date.getMonth() == i)).includes(true)) {
                    const filteringDiaries = tableContents.userDiary.filter(userDiary =>
                        userDiary.date.getMonth() == i)
                    secondPartDiariesOfMonth.push(new SecondPartDiariesOfMonth(i + 1, filteringDiaries))
                }
            }

            return new SecondPartDiariesOfMonthResDto(tableContents, secondPartDiariesOfMonth)
        } catch (err) {
            throw err
        }
    },

    getSecondPartChapterList: async () => {
        try {
            const chapterList = await SecondPartTableContent.find()
            return new SecondPartChapterListResDto(chapterList)
        } catch (err) {
            throw err
        }
    },

    addSecondPartChapter: async (chapterData) => {
        try {
            let newChapter = new SecondPartTableContent({
                title: chapterData.chapterTitle,
                chapter: await getNextChapter()
            })
            await newChapter.save()

            const tableContents = (await TableContents.find())[0]
            await tableContents.setSecondPartTableContents(newChapter)
            await tableContents.save()

        } catch (err) {
            throw err
        }

        async function getNextChapter() {
            const secondPartTableContents = (await SecondPartTableContent.find())
            const secondPartLength = secondPartTableContents.length

            return secondPartTableContents[secondPartLength - 1].chapter + 1
        }
    },

    modifySecondPartChapterInfo: async (chapterId, modifyChapterData) => {
        try {
            await SecondPartTableContent.update(
                { _id: chapterId },
                { $set: { title: modifyChapterData.chapterTitle } }
            )
        } catch (err) {
            throw err
        }
    },

    deleteSecondPartChapter: async (chapterId) => {
        try {
            //삭제하고자하는 2부 목차
            const findSecondPartChapter = await SecondPartTableContent.findById(chapterId).populate({
                path: "userDiary"
            })
            if(findSecondPartChapter === null){
                throw { statusCode : 400 }
            }

            //전체 2부 목차
            const tableContents = (await TableContents.find().populate({
                path: "secondPartTableContents"
            }))[0]

            //삭제할 2부 목차의 chapter보다 큰 챕터 배열 & chapter -1씩 줄임 & 저장
            tableContents.secondPartTableContents.filter(secondPartTable =>
                secondPartTable.chapter > findSecondPartChapter.chapter).forEach(async secondPartTable => {
                    secondPartTable.chapter -= 1
                    await secondPartTable.save()
                })
            

            //2부 목차에서 해당 목차 삭제
            await SecondPartTableContent.deleteOne({_id: `${chapterId}`})

            //2부 목차에 들어있던 userDiary 삭제
            const userDiaries = findSecondPartChapter.userDiary;

            userDiaries.forEach(async userDiary => {
                await UserDiary.deleteOne({_id:`${userDiary._id}`})
            })

            //총 목차(1부,2부)에서 해당 목차 secondPartTableContents배열에서 삭제
            const idx = tableContents.secondPartTableContents.findIndex(secondPartTable => secondPartTable._id == chapterId)
            tableContents.secondPartTableContents.splice(idx,1)
            await tableContents.save()
        } catch (err) {
            throw err
        }
    }
}