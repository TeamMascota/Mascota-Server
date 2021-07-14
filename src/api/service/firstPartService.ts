import User from "../../models/user/User"
import Pet from "../../models/pet/Pet"
import { DiaryResDto, FirstPartMainPageResDto, TableContentsResDto } from "../../dto/firstPart/mainPageDto/FirstPartMainPageResDto"
const dateMethod = require("../../modules/dateMethod")
const util = require('../../modules/util')
const responseMessage = require('../../modules/responseMessage')
const statusCode = require('../../modules/statusCode')
import Book from "../../models/book/Book"
import TableContents from "../../models/tableContents/TableContents"
import FirstPartTableContents from "../../models/tableContents/FirstPartTableContents"
import PetDiary from "../../models/diary/PetDiary"
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
                populate: ({
                    path: "tableContents",
                    populate: ({
                        path: "firstPartTableContents",
                        populate: ({
                            path: "petDiary",
                            populate: {
                                path: "petEmotions"
                            }
                        })
                    })
                })
            })
            console.log("user",findUser)
            let newBook=new Book()
            let newTableContents=new TableContents()
            let newFirstPartTableContents=new FirstPartTableContents()
            newTableContents.setFirstPartTableContents(newFirstPartTableContents)
            newBook.setTableContents(newTableContents)

            if(findUser.book==null){
                findUser.setBook(newBook)
            }
            if(findUser.book.tableContents==null){
                findUser.book.tableContents= new TableContents()
            }
            if(findUser.book.tableContents.firstPartTableContents==null){
                findUser.book.tableContents.firstPartTableContents.push(new FirstPartTableContents())
            }
            
            const firstPartMainPageResDto = new FirstPartMainPageResDto(findUser.book)
            let allPetDiaries = await PetDiary.find({}).populate('tableContents')
            let petDiaryNumber=(await allPetDiaries).length
            //가장 마지막 일기
            const lastDiary = new DiaryResDto(allPetDiaries[petDiaryNumber-1])
            
            //tableContents
            let lastTableNumber=findUser.book.tableContents.firstPartTableContents.length
            console.log("lastTable", TableContents)
            for (let i = 0; i < lastTableNumber; i++) {
                let tableContentsResDto = new TableContentsResDto(findUser.book.tableContents.firstPartTableContents[i])
                firstPartMainPageResDto.setTableContents(tableContentsResDto)
            }
            firstPartMainPageResDto.setDiary(lastDiary)

            if(findUser.book.tableContents.secondPartTableContents.length > 1){
                firstPartMainPageResDto.setSecondPartBook(findUser)
            }
            return firstPartMainPageResDto

        } catch (err) {
            console.log(err)
            throw { statusCode: statusCode.BAD_REQUEST, responseMessage: responseMessage.NO_USER }
        }
    }
}