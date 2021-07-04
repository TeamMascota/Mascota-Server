const util = require('../../modules/util')
const responseMessage = require('../../modules/responseMessage')
const statusCode = require('../../modules/statusCode')
const rainbowService = require('../service/rainbowService')

import Book from "../../models/book/Book"
require("../../models/book/Book")
import TableContents from "../../models/tableContents/TableContents"
import FirstPartTableContents from "../../models/tableContents/FirstPartTableContents"
import SecondPartTableContents from "../../models/tableContents/SecondPartTableContent"
import PetDiary from "../../models/diary/PetDiary"
import PetEmotions from "../../models/diary/PetEmotions"
import UserDiary from "../../models/diary/UserDiary"
import Help from "../../models/etc/Help"
import Comments from "../../models/etc/Comments"
import Institutions from "../../models/etc/Institution"

module.exports = {
    mainPage: async (req, res) => {
        const { userId, petId } = req.params;
        try {
             const result = await rainbowService.getMainPage(userId, petId)
        } catch (err) {
            console.error(err)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR))
        }
    }
}