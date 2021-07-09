import { IPetDiary } from "../../interfaces/diary/IPetDiary"
import { IUserDiary } from "../../interfaces/diary/IUserDiary"
import { IFirstPartTableContents } from "../../interfaces/tableContents/IFirstPartTableContents"
import { ISecondPartTableContents } from "../../interfaces/tableContents/ISecondPartTableContents"
import { IUser } from "../../interfaces/user/IUser"

const IPet = require("../../interfaces/pet/IPet")

export class CalendarResDto{
    private name = null
    private part = null
    private nextEpilogue = null
    private calendar = null

    constructor(name, part){
        this.name = name
        this.part = part
    }

    setCalendar(calendar : CalendarInfoResDto){
        this.calendar = calendar
    }
}

export class CalendarInfoResDto{
    private year = null
    private month = null
    private date = []

    constructor(year ,month){
        this.year = year
        this.month = month
    }

    setDate(calendarDateDto : CalendarDatePetDto | CalendarDateUserDto){
        this.date.push(calendarDateDto)
    }
}

export class CalendarDatePetDto{
    private days = null
    private kind = null
    private id = []
    private feeling = null

    constructor(days, petDiaries : IPetDiary[] ){
        this.days = days
        this.kind = petDiaries[0].pets[0].kind
        this.id = petDiaries.map(diary=>diary._id)
        this.feeling = petDiaries[0].petEmotions[0].feeling
    }
}

export class CalendarDateUserDto{
    private days = null
    private kind = null
    private diaryId = []
    private feeling = null

    constructor(days, userDiaries : IUserDiary[], user : IUser){
        this.days = days
        this.kind = this.getUsersPet(user)
        this.diaryId = userDiaries.map(diary => diary._id)
        this.feeling = userDiaries[0].feeling
    }

    getUsersPet(user : IUser){
        const pets = user.pets
        let petsKind = null
        for(let i = pets.length-1 ; i >=0 ; i--){
            if(pets[i].rainbow) petsKind = pets[i].kind
        }
        return petsKind
    }
}