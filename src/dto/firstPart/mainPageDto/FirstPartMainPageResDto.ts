import { IPetDiary } from "../../../interfaces/diary/IPetDiary";
import { IHelp } from "../../../interfaces/etc/IHelp";
import { IPet } from "../../../interfaces/pet/IPet";
import { IBook } from "../../../interfaces/book/IBook";
import { IFirstPartTableContents } from "../../../interfaces/tableContents/IFirstPartTableContents";
import { ITableContents } from "../../../interfaces/tableContents/ITableContents";
import { IUser } from "../../../interfaces/user/IUser";
const dateMethod=require('../../../modules/dateMethod')

export class FirstPartMainPageResDto {
    public firstPartMainPage = {
        title: null,
        bookImg: null,
        diary: {},
        tableContents: [],
        secondPartBook : null
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
    setSecondPartBook(user : IUser){
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
    constructor(firstPartTableContents: IFirstPartTableContents) {
        this.init(firstPartTableContents)
    }

    async init(firstPartTableContents: IFirstPartTableContents){
        console.log('!!!!!!!!!!!!!!! : '+firstPartTableContents)
        this.chapter = firstPartTableContents.chapter
        this.episode = firstPartTableContents.petDiary.length;
        console.log('@@@@@@@ : '+this.episode)
        console.log('######## : '+firstPartTableContents.petDiary[this.episode-1])
        this._id = firstPartTableContents.petDiary[this.episode-1]._id
        this.title = firstPartTableContents.petDiary[this.episode-1].title;
        this.contents = firstPartTableContents.petDiary[this.episode-1].contents;
        this.date = await dateMethod.toStringByFormatting(firstPartTableContents.petDiary[this.episode-1].date);
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

export class SecondPartBookResDto{
    private userId
    private imgs
    private author
    private date

    constructor(user : IUser){
        this.init(user)
    }

    async init(user : IUser){
        this.userId = user._id
        this.imgs = user.book.imgs
        this.author = user.book.author
        this.date = await dateMethod.toStringByFormatting(user.book.date)
    }
}