import { IUserDiary } from "../../interfaces/diary/IUserDiary"
import { ISecondPartTableContents } from "../../interfaces/tableContents/ISecondPartTableContents"

export class SecondPartDiariesOfMonthResDto{
    private _id = null
    private chapter = null
    private chapterTitle = null
    private diariesOfMonth = null

    constructor(tableContents : ISecondPartTableContents, secondPartyDiariesOfMonth : SecondPartDiariesOfMonth[]){
        this._id = tableContents._id
        this.chapter = tableContents.chapter
        this.chapterTitle = tableContents.title
        this.diariesOfMonth = secondPartyDiariesOfMonth
    }
}

export class SecondPartDiariesOfMonth{
    private month = null
    private diaryCountOfTableContents = null
    private diaries = []

    constructor(month : number, userDiaries : IUserDiary[]){
        this.month = month
        this.diaryCountOfTableContents = userDiaries.length
        this.diaries = userDiaries.sort((a,b)=>
        b.date.getDate() - a.date.getDate()
    ).map(diary=> new SecondPartDiaries(diary))
    }

}

export class SecondPartDiaries{
    private diaryId = null
    private days = null
    private dayOfWeek = null
    private feeling = null
    private kind = null
    private title = null
    private contents = null
    private img = null

    constructor(userDiary : IUserDiary){
        const weeks = ["일","월","화","수","목","금","토"]
        this.diaryId = userDiary._id
        this.days = userDiary.date.getDate()
        this.dayOfWeek = weeks[userDiary.date.getDay()]
        this.feeling = userDiary.feeling
        this.kind = 0
        this.title = userDiary.title
        this.contents = userDiary.contents
        this.img = userDiary.imgs[0]
    }
}