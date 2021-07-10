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
    public petDiary = {
        _id:null,
        chapter:null,
        episode:null,
        title : null,
        bookImg : [],
        date:null,
        contents:null,
        timeTogether:null,
        kind:null
    }
    

    constructor(petDiary : IPetDiary){
        //가장 먼저 있는 애 기준 날짜 정리
        this.init(petDiary)
    }
    async init(petDiary:IPetDiary){
        this.petDiary._id=petDiary._id
        //this.petDiaryPage.chapter=temp.chapter
        this.petDiary.title=petDiary.title
        this.petDiary.bookImg=petDiary.imgs
        this.petDiary.date=petDiary.date
        this.petDiary.episode=petDiary.episode
        this.petDiary.contents=petDiary.contents
        this.petDiary.kind=petDiary.pets[0].kind
        this.petDiary.timeTogether= await dateMethod.getElapsedDay(petDiary.pets[0].startDate)
    }

}
export{}