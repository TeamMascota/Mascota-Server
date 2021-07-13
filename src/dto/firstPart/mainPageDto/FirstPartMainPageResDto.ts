import { IPetDiary } from "../../../interfaces/diary/IPetDiary";
import { IHelp } from "../../../interfaces/etc/IHelp";
import { IPet } from "../../../interfaces/pet/IPet";
import { IBook } from "../../../interfaces/book/IBook";
import { IFirstPartTableContents } from "../../../interfaces/tableContents/IFirstPartTableContents";
import { ITableContents } from "../../../interfaces/tableContents/ITableContents";
import { IUser } from "../../../interfaces/user/IUser";
const dateMethod = require('../../../modules/dateMethod')

export class FirstPartMainPageResDto {
    public firstPartMainPage = {
        title: null,
        bookImg: null,
        diary: {},
        tableContents: [],
        secondPartBook: null
    }

    constructor(book: IBook) {
        this.firstPartMainPage.title = book.title
        this.firstPartMainPage.bookImg = book.imgs
    }

    //가장 최근 일기 작성(기분X)
    setDiary(diary: DiaryResDto) {
        this.firstPartMainPage.diary = diary
    }
    setTableContents(tableContents: TableContentsResDto) {
        this.firstPartMainPage.tableContents.push(tableContents)
    }
    setSecondPartBook(user: IUser) {
        this.firstPartMainPage.secondPartBook = new SecondPartBookResDto(user)
    }
}

export class DiaryResDto {
    private _id;
    private chapter;
    private episode;
    private title;
    private contents;
    private date;

    //가장 마지막 화 들어감
    constructor(petDiary: IPetDiary) {
        this.init(petDiary)
    }

    async init(petDiary: IPetDiary) {
        const firstPartTableContents = petDiary.tableContents
        this.chapter = firstPartTableContents.chapter
        this.episode = firstPartTableContents.petDiary.length;
        //if(this.chapter==0){
        //    this._id="60ed3acde5003a744892ce27"
        //}else{
            this._id=petDiary._id
        //}
        this.title = petDiary.title;
        this.contents = petDiary.contents;
        this.date = await dateMethod.toStringByFormatting(petDiary.date);
    }
}

export class TableContentsResDto {
    private chapterId;
    private chapter;
    private chapterName;
    private episodePerchapterCount;

    constructor(firstPartTableContents: IFirstPartTableContents) {
        this.chapterId = firstPartTableContents._id //목차 Id
        this.chapter = firstPartTableContents.chapter;
        this.chapterName = firstPartTableContents.title;
        this.episodePerchapterCount = firstPartTableContents.petDiary.length;
    }
}

export class SecondPartBookResDto {
    private userId
    private imgs
    private author
    private date

    constructor(user: IUser) {
        this.init(user)
    }

    async init(user: IUser) {
        this.userId = user._id
        this.imgs = user.book.imgs
        this.author = user.book.author
        this.date = await dateMethod.toStringByFormatting(user.book.date)
    }
}