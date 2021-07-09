import { IPetDiary, IPetDiaryDocument } from "../../interfaces/diary/IPetDiary";
import { IPetEmotions } from "../../interfaces/diary/IPetEmotions";
import { IFirstPartTableContents } from "../../interfaces/tableContents/IFirstPartTableContents";
import PetDiary from "../../models/diary/PetDiary"
import PetEmotions from "../../models/diary/PetEmotions"
require("../../models/user/User")
require("../../models/book/Book")
require("../../models/pet/Pet")
require('../../models/tableContents/TableContents')
require('../../models/tableContents/FirstPartTableContents')
const dateMethod = require('../../modules/dateMethod')

export class PetChapterDiaryResDto{
    public petChapterDiary = {
        chapterId:null,
        chapter:null,
        chapterTitle:null,
        monthly:[]
        }
    
    constructor(firstPartTableContents:IFirstPartTableContents){
        this.petChapterDiary.chapterId=firstPartTableContents._id
        this.petChapterDiary.chapter=firstPartTableContents.chapter
        this.petChapterDiary.chapterTitle=firstPartTableContents.title
    }
    setMonthly(monthly:MonthlyDiaryResDto){
        this.petChapterDiary.monthly.push(monthly)
    }
}

export class MonthlyDiaryResDto{
    public monthly={
        episodePerMonthCount:null,
        month:null,
        diaries:[]
    }
    constructor(){ }
    setMonthCount(monthCount:Number){this.monthly.episodePerMonthCount=monthCount}
    setMonth(month:Number){  this.monthly.month=month}
    setDiaries(diary:DiariesResDto){
        this.monthly.diaries.push(diary)
    }
    
}
export class DiariesResDto{
    public diary={
        diaryId:null,
        title:null,
        contents:null,
        episode:null,
        image:null,
        feelingCount:null,
        feeling:null,
        date:null,
        weekday:null
    }
    constructor(diary : IPetDiary){
        const week=new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일');
        this.diary.diaryId=diary._id
        this.diary.title=diary.title
        this.diary.contents=diary.contents
        this.diary.episode=diary.episode
        this.diary.image=diary.imgs[0]//가장 첫번째 사진
        this.diary.feelingCount=diary.petEmotions.length
        this.diary.feeling=diary.petEmotions[0].feeling
        this.diary.date=diary.date.getDate()+"일"
        this.diary.weekday= week[diary.date.getDate()]
    }
    setFeeling(petEmotion:Number){
        this.diary.feeling=petEmotion
    }
}
export{}