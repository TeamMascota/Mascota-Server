import User from "../../models/user/User"
import Pet from "../../models/pet/Pet"
import { RainbowMainPageResDto, MemoriesResDto, HelpResDto } from "../../dto/rainbow/mainPageDto/rainbowMainPageResDto"
import Help from "../../models/etc/Help"

require("../../models/user/User")
require("../../models/pet/Pet")
require("../../models/book/Book")
require('../../models/tableContents/TableContents')
require('../../models/tableContents/FirstPartTableContents')
require('../../models/tableContents/SecondPartTableContent')
require("../../models/etc/Help")

module.exports = {
    getMainPage: async (userId, petId) => {
        
    },
}