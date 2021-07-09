import { IPetDiary, IPetDiaryDocument } from "../../interfaces/diary/IPetDiary";
import PetDiary from "../../models/diary/PetDiary"
import PetEmotions from "../../models/diary/PetEmotions"
require("../../models/user/User")
require("../../models/book/Book")
require("../../models/pet/Pet")
require('../../models/tableContents/TableContents')
require('../../models/tableContents/FirstPartTableContents')
const dateMethod = require('../../modules/dateMethod')

export class PetDiaryPageResDto{
    public petDiaryPage = {
        _id:null,
        chapter:null,
        title : null,
        bookImg : [],
        date:null,
        contents:null,
        timeTogether:null
    }

    constructor(petDiary : IPetDiary){
        _id:petDiary._id
        chapter:petDiary.tableContents.chapter
        title:petDiary.title
        bookImg:petDiary.imgs
        date:petDiary.date
        contents:petDiary.contents
        //가장 먼저 있는 애 기준 날짜 정리
        timeTogether: dateMethod.getElapsedDay(petDiary.pets[0].startDate)
    }

}
export{}