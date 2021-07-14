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
        monthly:[],
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
        episodePerMonthCount=null
        month=null
        diaries=[]
    
    constructor(){ }
    setMonthCount(monthCount:Number){this.episodePerMonthCount=monthCount}
    setMonth(month:Number){  this.month=month}
    setDiaries(diary:DiariesResDto){
        this.diaries.push(diary)
    }
    
}
export class DiariesResDto{
        diaryId=null
        title=null
        contents=null
        episode=null
        image=null
        feelingCount=null
        feeling=null
        date=null
        weekday=null
        kind=null

    constructor(diary : IPetDiary){
        const week=new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일');
        this.diaryId=diary._id
        this.title=diary.title
        this.contents=diary.contents
        this.episode=diary.episode
        this.image=diary.imgs[0]//가장 첫번째 사진
        this.feelingCount=diary.petEmotions.length
        this.feeling=diary.petEmotions[0].feeling
        this.date=diary.date.getDate()+"일"
        this.weekday= week[diary.date.getDate()]
        this.kind=diary.pets[0].kind
    }
    setFeeling(petEmotion:Number){
        this.feeling=petEmotion
    }
}
export{}