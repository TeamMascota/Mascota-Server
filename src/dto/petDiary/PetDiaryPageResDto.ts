import { IPetDiary, IPetDiaryDocument } from "../../interfaces/diary/IPetDiary";
import { IPetEmotions } from "../../interfaces/diary/IPetEmotions";
require("../../models/user/User")
require("../../models/book/Book")
require("../../models/pet/Pet")
require('../../models/tableContents/TableContents')
require('../../models/tableContents/FirstPartTableContents')
const dateMethod = require('../../modules/dateMethod')

<<<<<<< HEAD
export class PetDiaryPageResDto {
    public petDiary = {
        _id: null,
        //chapter:null,
        episode: null,
        title: null,
        bookImg: [],
        date: null,
        contents: null,
        timeTogether: null,
        kind: null,
        feelingList: []
    }


    constructor(petDiary: IPetDiary) {
        this.init(petDiary)
    }
    async init(petDiary: IPetDiary) {
        this.petDiary._id = petDiary._id
        //this.petDiaryPage.chapter=temp.chapter
        this.petDiary.title = petDiary.title
        this.petDiary.bookImg = petDiary.imgs
        this.petDiary.date = await dateMethod.toKoreanByFormatting(petDiary.date)
        this.petDiary.episode = petDiary.episode
        this.petDiary.contents = petDiary.contents
        this.petDiary.kind = petDiary.pets[0].kind
        this.petDiary.timeTogether = await dateMethod.getElapsedDay(petDiary.pets[0].startDate)
    }
    setFeelingList(emotion: IPetEmotions) {
        this.petDiary.feelingList.push(emotion.feeling)
=======
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
>>>>>>> 35fa17a68301c84a39481a189b351a8878cd923c
    }

}
export { }