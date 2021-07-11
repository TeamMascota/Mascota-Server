import { IBook } from "../../interfaces/book/IBook"
import { IUserDiary } from "../../interfaces/diary/IUserDiary"
import { IPet } from "../../interfaces/pet/IPet"
import { ISecondPartTableContents } from "../../interfaces/tableContents/ISecondPartTableContents"
import { IUser } from "../../interfaces/user/IUser"
const dateMethod = require('../../modules/dateMethod')

export class SecondPartMainPageResDto{
    private part = null
    private author = null
    private bookImg = null
    private memory : SecondPartMainPageMemory = null
    private tableContents : SecondPartMainPageTableContents[] = null
    private firstPartBook : SecondPartMainPageFirstPartBook = null

    constructor(user : IUser, sortUserDiary : IUserDiary){
        this.part = 2
        this.author = user.book.author
        this.bookImg = user.book.imgs
        this.memory = new SecondPartMainPageMemory(sortUserDiary)
        this.tableContents = user.book.tableContents.secondPartTableContents.map(secondPartTableContents=>
            new SecondPartMainPageTableContents(secondPartTableContents))
        this.firstPartBook = new SecondPartMainPageFirstPartBook(user.book)
    }
}

export class SecondPartMainPageMemory{
    private diary : SecondPartMainPageDiary= null
    private nextEpisode = null

    constructor(sortUserDiary : IUserDiary){
        this.diary =  new SecondPartMainPageDiary(sortUserDiary)
        this.nextEpisode =  sortUserDiary.episode+1
    }
}

export class SecondPartMainPageDiary{
    private episode = null
    private title = null
    private contents = null
    private date = null

    constructor(sortUserDiary : IUserDiary){
        this.init(sortUserDiary)
    }

    async init(sortUserDiary){
        this.episode = sortUserDiary.episode
        this.title = sortUserDiary.title
        this.contents = sortUserDiary.contents
        this.date = await dateMethod.toStringByFormatting(sortUserDiary.date)
    }
}

export class SecondPartMainPageTableContents{
    private chapter = null
    private title = null
    private episodePerChapterCount = null
    private _id = null

    constructor(secondPartTableContents : ISecondPartTableContents){
        this.chapter = secondPartTableContents.chapter
        this.title = secondPartTableContents.title
        this._id = secondPartTableContents._id
        this.episodePerChapterCount = secondPartTableContents.userDiary.length
    }
}

export class SecondPartMainPageFirstPartBook{
    private _id = null
    private bookImg = null
    private author = null
    private date = null

    constructor(book : IBook){
        this._id = book._id
        this.bookImg = book.imgs
        this.author = book.author
        this.date = book.date
    }
}