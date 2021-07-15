import { IBook } from "../../interfaces/book/IBook"
import { IUserDiary } from "../../interfaces/diary/IUserDiary"
import { IPet } from "../../interfaces/pet/IPet"
import { ISecondPartTableContents } from "../../interfaces/tableContents/ISecondPartTableContents"
import { IUser } from "../../interfaces/user/IUser"
import SecondPartTableContent from "../../models/tableContents/SecondPartTableContent"
require('../../models/tableContents/SecondPartTableContent')
const dateMethod = require('../../modules/dateMethod')

export class SecondPartMainPageResDto{
    public secondPartMainPage={
    //private author = null,
    title:null,
    bookImg : null,
    diary : null,
    tableContents: [],
    firstPartBook : null,
    nextEpisode : null
}
    constructor(user : IUser, sortUserDiary : IUserDiary){
        //this.author = user.book.author
        this.secondPartMainPage.bookImg = user.book.imgs
        this.secondPartMainPage.title=user.book.title
        this.secondPartMainPage.tableContents = user.book.tableContents.secondPartTableContents.map(secondPartTableContents=>
            new SecondPartMainPageTableContents(secondPartTableContents))
        this.secondPartMainPage.firstPartBook = new SecondPartMainPageFirstPartBook(user.book)
        this.setNextEpisode(sortUserDiary)
    }
    setDiary(diary: SecondPartMainPageDiary){
        console.log('2222222 :',diary)
        this.secondPartMainPage.diary=diary
    }
    setNextEpisode(sortUserDiary:IUserDiary){
        this.secondPartMainPage.nextEpisode =  sortUserDiary.episode+1
    }
}

export class SecondPartMainPageDiary{
    private episode = null
    private title = null
    private contents = null
    private date = null
    private _id=null
    private chapter=null

    constructor(chapter:Number,sortUserDiary : IUserDiary){
        //console.log("!!!!!",sortUserDiary)
        this.init(chapter,sortUserDiary)
    }

    async init(chapter:Number,sortUserDiary){  
        this._id=sortUserDiary._id
        this.episode = sortUserDiary.episode
        this.title = sortUserDiary.title
        this.contents = sortUserDiary.contents
        this.chapter=chapter
        this.date = await dateMethod.toStringByFormatting(sortUserDiary.date)
    }
}

export class SecondPartMainPageTableContents{
    private chapter = null
    private chapterTitle = null
    private episodePerChapterCount = null
    private chapterId = null

    constructor(secondPartTableContents : ISecondPartTableContents){
        this.chapter = secondPartTableContents.chapter
        this.chapterTitle = secondPartTableContents.title
        this.chapterId = secondPartTableContents._id
        this.episodePerChapterCount = secondPartTableContents.userDiary.length
    }
}

export class SecondPartMainPageFirstPartBook{
    private userId = null
    private bookImg = null
    private author = null
    private date = null

    constructor(book : IBook){
        this.init(book)
    }

    async init(book:IBook){
        this.userId = book._id
        this.bookImg = book.imgs
        this.author = book.author
        this.date = await dateMethod.toStringByFormatting(book.date)
    }
}