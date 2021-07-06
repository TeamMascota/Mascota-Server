import { IPetDiary } from "../../../interfaces/diary/IPetDiary"

export class TheBestMomentsResDto{
    theBestMoments : []

    constructor(){}


}

export class IllegalityTheBestMoment{   //[우울,화,심심]
    blackBile : TheBestMoment
    angry : TheBestMoment
    bored : TheBestMoment

    constructor(){
        this.blackBile
        this.angry
        this.bored
    }
}

export class TheBestMoment{ //[사랑],[기쁨],[보통]
    comment : null
    feeling : null
    diaries : []

    constructor(){
        this.comment
        this.feeling
        this.diaries
    }
}

export class TheBestMomentDiary{
    chapter : number
    episode : number
    title : string
    contents : string
    date : string

    constructor(diaryPerMood : IPetDiary[]){
        
    }
}