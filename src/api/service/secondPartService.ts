import SecondPartTableContent from "../../models/tableContents/SecondPartTableContent"
import PetDiary from "../../models/diary/PetDiary"
import UserDiary from "../../models/diary/UserDiary"
import User from "../../models/user/User"
import Book from "../../models/book/Book"
import { SecondPartMainPageResDto, SecondPartMainPageTableContents } from "../../dto/secondPart/SecondPartMainPageResDto"
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
            }else{
                sortSecondPartTableContents.push({
                    nextEpisode : 1,
                    episode : 0,
                    title : epilogue.title,
                    contents : epilogue.contents,
                    date : user.book.tableContents.secondPartStartDate
                })
            }

            return new SecondPartMainPageResDto(user, sortSecondPartTableContents[0])
        } catch (err) {
            throw err
        }
    }
}