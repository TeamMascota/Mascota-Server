import User from "../../models/user/User"
import Pet from "../../models/pet/Pet"
import { DiaryResDto,FirstPartMainPageResDto,TableContentsResDto } from "../../dto/firstPart/mainPageDto/FirstPartMainPageResDto"
const dateMethod=require("../../modules/dateMethod")
const util = require('../../modules/util')
const responseMessage = require('../../modules/responseMessage')
const statusCode = require('../../modules/statusCode')

require("../../models/user/User")
require("../../models/pet/Pet")
require("../../models/book/Book")
require('../../models/tableContents/TableContents')
require('../../models/tableContents/FirstPartTableContents')
require('../../models/diary/PetDiary')
require('../../models/diary/PetEmotions')
require('../../models/diary/UserDiary')

module.exports = {
    getMainPage: async (userId) => {
        try {
            //find userData
            const findUser = await User.findById(userId).populate({
                path: "pets"
            }).populate({
                path: "book",
                populate: {
                    path: "tableContents",
                    populate: {
                        path: "firstPartTableContents",
                        populate: {
                            path: "petDiary",
                            populate: {
                                path: "petEmotions"
                            }
                        }
                    }
                }
            })

            const firstPartMainPageResDto = new FirstPartMainPageResDto(findUser.book)
            const lastDiary = new DiaryResDto( findUser.book.tableContents.firstPartTableContents[3])
            for(let i=0; i<findUser.book.tableContents.firstPartTableContents.length;i++){
            let tableContentsResDto = new TableContentsResDto(findUser.book.tableContents.firstPartTableContents[i])
            firstPartMainPageResDto.setTableContents(tableContentsResDto)
            }
            firstPartMainPageResDto.setDiary(lastDiary)
            return responseMessage.SUCCESS_GET_FIRSTPART_MAINPAGE;
        } catch (err) {
            console.log(err)
            throw { statusCode: statusCode.BAD_REQUEST, responseMessage: responseMessage.NO_USER}
        }
    }
}