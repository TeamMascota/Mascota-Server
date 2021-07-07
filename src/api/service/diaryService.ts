
import { response } from "express"
import User from "../../models/user/User"
import Book from "../../models/book/Book"
import TableContents from "../../models/tableContents/TableContents"
import FirstPartTableContents from "../../models/tableContents/FirstPartTableContents"
import PetDiary from "../../models/diary/PetDiary"
require("../../models/user/User")
require("../../models/book/Book")
require('../../models/tableContents/TableContents')
require('../../models/tableContents/FirstPartTableContents')
require('../../models/diary/PetDiary')
const util = require('../../modules/util')
const responseMessage = require('../../modules/responseMessage')
const statusCode = require('../../modules/statusCode')

module.exports = {
    postPrologue: async (bookData) => {
        try {
            // add book info
            let book = await new Book();
            book=await Book.findById(bookData._id);
            book.title = await bookData.title;
            book.imgs = await bookData.image;
            book.author= await bookData.userName;

            //add tableContents info
            let tc = await new TableContents();
            let tempPetDiary= await new PetDiary({
                title: bookData.prologueTitle,
                contents: bookData.prologueContents
            })
            let ftc =await new FirstPartTableContents({
                chapter: 0,
                title:"프롤로그"
                // title: bookData.prologueTitle,
                // contents: bookData.prologueContents
            })

            await ftc.setPetDiary(tempPetDiary)
            await tc.setFirstPartTableContents(ftc);
            await tempPetDiary.setTableContents(tc);
            await book.setTableContents(tc);
            //save db
            await book.save()
            return responseMessage.SUCCESS_POST_PROLOGUE;

            //error handling
        } catch (err) {
            console.log(err)
            throw { statusCode: statusCode.BAD_REQUEST, responseMessage: responseMessage.NO_BOOK}
        }
    },
}