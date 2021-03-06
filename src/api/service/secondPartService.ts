import SecondPartTableContent from "../../models/tableContents/SecondPartTableContent"
import PetDiary from "../../models/diary/PetDiary"
import UserDiary from "../../models/diary/UserDiary"
import User from "../../models/user/User"
import Book from "../../models/book/Book"
import { SecondPartMainPageResDto,SecondPartMainPageDiary ,SecondPartMainPageTableContents } from "../../dto/secondPart/SecondPartMainPageResDto"
import { SecondPartDiariesOfMonth, SecondPartDiariesOfMonthResDto } from "../../dto/secondPart/SecondPartDiariesOfMonthResDto"
import { SecondPartChapterListResDto } from "../../dto/secondPart/SecondPartChapterListResDto"
import { SecondPartDiaryResDto } from "../../dto/secondPart/SecondPartDiaryResDto"
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
            //console.log('mmmm : ',user)

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
            //console.log("sort",sortSecondPartTableContents)
            const curSecondPartTableContents=await SecondPartTableContent.findById(sortSecondPartTableContents[0].tableContents)
            let mainPageDto=new SecondPartMainPageResDto(user, sortSecondPartTableContents[0])
            console.log("????????????...",curSecondPartTableContents)
            mainPageDto.setDiary(await new SecondPartMainPageDiary(curSecondPartTableContents.chapter,sortSecondPartTableContents[0]))
            return mainPageDto
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

            const chapterList = await SecondPartTableContent.find()
            return new SecondPartChapterListResDto(chapterList)

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
            await SecondPartTableContent.updateOne(
                { _id: chapterId },
                { $set: { title: modifyChapterData.chapterTitle } }
            )
            const chapterList = await SecondPartTableContent.find()
            return new SecondPartChapterListResDto(chapterList)
        } catch (err) {
            throw err
        }
    },

    deleteSecondPartChapter: async (chapterId) => {
        try {
            //????????????????????? 2??? ??????
            const findSecondPartChapter = await SecondPartTableContent.findById(chapterId).populate({
                path: "userDiary"
            })
            if (findSecondPartChapter === null) {
                throw { statusCode: 400 }
            }

            //?????? 2??? ??????
            const tableContents = (await TableContents.find().populate({
                path: "secondPartTableContents"
            }))[0]

            //????????? 2??? ????????? chapter?????? ??? ?????? ?????? & chapter -1??? ?????? & ??????
            tableContents.secondPartTableContents.filter(secondPartTable =>
                secondPartTable.chapter > findSecondPartChapter.chapter).forEach(async secondPartTable => {
                    secondPartTable.chapter -= 1
                    await secondPartTable.save()
                })

            //2??? ???????????? ?????? ?????? ??????
            await SecondPartTableContent.deleteOne({ _id: `${chapterId}` })

            //2??? ????????? ???????????? userDiary ??????
            const userDiaries = findSecondPartChapter.userDiary;

            userDiaries.forEach(async userDiary => {
                await UserDiary.deleteOne({ _id: `${userDiary._id}` })
            })

            //??? ??????(1???,2???)?????? ?????? ?????? secondPartTableContents???????????? ??????
            const idx = tableContents.secondPartTableContents.findIndex(secondPartTable => secondPartTable._id == chapterId)
            tableContents.secondPartTableContents.splice(idx, 1)
            await tableContents.save()

            const chapterList = await SecondPartTableContent.find()
            return new SecondPartChapterListResDto(chapterList)
        } catch (err) {
            throw err
        }
    }, getSecondPartDiary: async (diaryId) => {
        try {
            console.log(diaryId)
            const findSecondPartDiary = await UserDiary.findById(diaryId).populate('users').populate('tableContents');
            console.log(findSecondPartDiary)
            let secondPartDiaryResDto = await new SecondPartDiaryResDto(findSecondPartDiary)
            console.log(secondPartDiaryResDto)
            return secondPartDiaryResDto

        } catch (err) {
            console.log(err)
            throw { statusCode: 400 }
        }

    }, addSecondPartDiary: async (diaryData) => {
        const secondPartTableContents = await SecondPartTableContent.findById(diaryData.chapterId).populate('userDiary')
        console.log("length: ", secondPartTableContents.userDiary.length)
        let newUserDiary = new UserDiary({
            tableContents: diaryData.chapterId,
            episode: secondPartTableContents.userDiary.length,
            imgs: "https://watcha.s3.ap-northeast-2.amazonaws.com/images/origin/%EC%B1%85+%EC%9D%B4%EB%AF%B8%EC%A7%80.jpg",
            title: diaryData.title,
            contents: diaryData.contents,
            feeling: diaryData.feeling
        })
        secondPartTableContents.setUserDiary(newUserDiary)
        await secondPartTableContents.save()
        try {
            console.log(newUserDiary)
            await newUserDiary.save()
        } catch (err) {
            console.log(err)
            throw { statusCode: 400 }
        }
    }
    ,
    modifySecondPartDiary: async (diaryId, diaryData) => {
        try {
            await UserDiary.updateOne(
                { _id: diaryId },
                { $set: { imgs: diaryData.diaryImages, title: diaryData.title, contents: diaryData.contents, feeling: diaryData.feeling } }
            )
        } catch (err) {
            throw err
        }
    }, deleteSecondPartDiary: async (diaryId) => {
        try {
            const findDiary = await UserDiary.findById(diaryId).populate('tableContents');
            const userDiaries = (await SecondPartTableContent.findOne({ chapter: { $eq: findDiary.tableContents.chapter } })).userDiary
            for (let i = 0; i < userDiaries.length; i++) {
                let userChapter = await UserDiary.findById(userDiaries[i])
                if (findDiary.episode <= userChapter.episode) {
                    userChapter.episode = Number(userChapter.episode) - 1
                    await userChapter.save()
                }
            }
            await UserDiary.deleteOne({ _id: findDiary })

            for(let j = 0 ;j<findDiary.tableContents.userDiary.length;j++){
                if(findDiary.tableContents.userDiary[j]._id == diaryId){
                    findDiary.tableContents.userDiary.splice(j,1)
                }
            }
            await findDiary.tableContents.save()
        } catch (err) {
            throw err
        }
    }
}