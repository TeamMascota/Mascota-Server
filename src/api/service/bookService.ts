import User from "../../models/user/User"
import Book from "../../models/book/Book"
import TableContents from "../../models/tableContents/TableContents"
import FirstPartTableContents from "../../models/tableContents/FirstPartTableContents"
import { response } from "express"
require("../../models/user/User")
require("../../models/book/Book")
require('../../models/tableContents/TableContents')
require('../../models/tableContents/FirstPartTableContents')
const util = require('../../modules/util')
const responseMessage = require('../../modules/responseMessage')
const statusCode = require('../../modules/statusCode')

module.exports = {
    postPrologue: async (bookData) => {
        try {
            // add book info
            let book = new Book();
            book=await Book.findById(bookData._id);
            book.title = bookData.title;
            book.imgs = bookData.image;
            book.author=bookData.userName;

            //add tableContents info
            let tc = new TableContents();
            let ftc = new FirstPartTableContents({
                chapter: 0,
                title: bookData.prologueTitle,
                contents: bookData.prologueContents
            })
            tc.setFirstPartTableContents(ftc);
            await book.setTableContents(tc);

            //save db
            book.save()
            return responseMessage.SUCCESS_POST_PROLOGUE;

            //error handling
        } catch (err) {
            console.log(err)
            throw { statusCode: statusCode.BAD_REQUEST, responseMessage: responseMessage.NO_BOOK}
        }
    },
}