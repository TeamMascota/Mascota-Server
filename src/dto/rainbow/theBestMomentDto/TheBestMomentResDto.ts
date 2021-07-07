import { IPetDiary } from "../../../interfaces/diary/IPetDiary"
import { IComments } from "../../../interfaces/etc/IComments"
const dateMethod = require("../../../modules/dateMethod")

export class TheBestMomentsResDto{
    private theBestMoments = []

    constructor(){}

    setTheBestMoment(theBestMoment : TheBestMoment){
        this.theBestMoments.push(theBestMoment)
    }
}

export class TheBestMoment{ //[사랑],[기쁨],[보통]
    private comment = null
    private feeling = null
    private diaries = []

    constructor(commentPerFeeling : IComments, theBestMomentDiary : TheBestMomentDiary[]){
        this.comment = commentPerFeeling.comments
        this.feeling = commentPerFeeling.feeling
        this.diaries = theBestMomentDiary
    }
}

export class TheBestMomentDiary{
    private chapter = null
    private episode = null
    private title = null
    private contents = null
    private date = null

    constructor(diaryPerFeeling : IPetDiary){
        this.init(diaryPerFeeling)
    }

    async init(diaryPerFeeling : IPetDiary){
        this.chapter = diaryPerFeeling.tableContents.chapter
        this.episode = diaryPerFeeling.episode
        this.title = diaryPerFeeling.title
        this.contents = diaryPerFeeling.contents
        this.date = await dateMethod.toStringByFormatting(diaryPerFeeling.date)
    }
}