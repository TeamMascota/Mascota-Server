import { IPetDiary } from "../../../interfaces/diary/IPetDiary"
import { IComments } from "../../../interfaces/etc/IComments"
import { IPet } from "../../../interfaces/pet/IPet"
const dateMethod = require("../../../modules/dateMethod")

export class TheBestMomentsResDto {
    private pet = {}
    private theBestMoments = []
    private timeTogether = {}

    constructor(timeTogether : Date) { 
        this.init(timeTogether)
    }

    async init(timeTogether : Date){
        this.timeTogether = `${(await dateMethod.toStringByFormatting(timeTogether))} - ${await dateMethod.toStringByFormatting(new Date())}`
    }

    setTheBestMoment(theBestMoment: TheBestMoment) {
        this.theBestMoments.push(theBestMoment)
    }

    setTheBestMomentPetInfo(petInfo: TheBestMomentPetInformation) {
        this.pet = petInfo
    }
}

export class TheBestMomentPetInformation {
    private name = null
    private kind = null

    constructor(pet: IPet) {
        this.name = pet.name
        this.kind = pet.kind
    }
}

export class TheBestMoment { //[사랑],[기쁨],[보통]
    private comment = null
    private feeling = null
    private diaries = []

    constructor(commentPerFeeling, theBestMomentDiary: TheBestMomentDiary[]) {
        this.comment = commentPerFeeling.comments
        this.feeling = commentPerFeeling.feeling
        this.diaries = theBestMomentDiary
    }
}

export class TheBestMomentDiary {
    private diaryId=null
    private chapter = null
    private episode = null
    private title = null
    private contents = null
    private date = null

    constructor(diaryPerFeeling: IPetDiary) {
        this.init(diaryPerFeeling)
    }

    async init(diaryPerFeeling: IPetDiary) {
        //console.log('!!!!!!!!!!!!!!!!!!!!!!!!! : ' + diaryPerFeeling)
        if (diaryPerFeeling != undefined) {
            this.diaryId= diaryPerFeeling._id
            this.chapter = diaryPerFeeling.tableContents.chapter
            this.episode = diaryPerFeeling.episode
            this.title = diaryPerFeeling.title
            this.contents = diaryPerFeeling.contents
            this.date = await dateMethod.toStringByFormatting(diaryPerFeeling.date)
        }
    }
}