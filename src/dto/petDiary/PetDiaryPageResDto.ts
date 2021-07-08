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
        episode:null,
        title : null,
        bookImg : [],
        date:null,
        contents:null,
        timeTogether:null
    }
    

    constructor(petDiary : IPetDiary){
        //가장 먼저 있는 애 기준 날짜 정리
        this.init(petDiary)
    }
    async init(petDiary:IPetDiary){
        const temp= petDiary.populate('_id')
        this.petDiaryPage._id=petDiary._id
        //this.petDiaryPage.chapter=temp.chapter
        this.petDiaryPage.title=petDiary.title
        this.petDiaryPage.bookImg=petDiary.imgs
        this.petDiaryPage.date=petDiary.date
        this.petDiaryPage.episode=petDiary.episode
        this.petDiaryPage.contents=petDiary.contents
        this.petDiaryPage.timeTogether= await dateMethod.getElapsedDay(petDiary.pets[0].startDate)
    }

}
export{}