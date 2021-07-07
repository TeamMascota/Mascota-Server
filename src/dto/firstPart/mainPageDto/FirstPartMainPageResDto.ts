import { IPetDiary } from "../../../interfaces/diary/IPetDiary";
import { IHelp } from "../../../interfaces/etc/IHelp";
import { IPet } from "../../../interfaces/pet/IPet";
import { IBook } from "../../../interfaces/book/IBook";
import { IFirstPartTableContents } from "../../../interfaces/tableContents/IFirstPartTableContents";
import { ITableContents } from "../../../interfaces/tableContents/ITableContents";
const dateMethod=require('../../../modules/dateMethod')

export class FirstPartMainPageResDto {
    public firstPartMainPage = {
        title: null,
        bookImg: null,
        diary: {},
        tableContents: null
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
}

export class DiaryResDto {
    private chapter;
    private episode;
    private title;
    private contents;
    private date;

    //가장 마지막 화 들어감
    constructor(firstPartTableContents: IFirstPartTableContents) {
        this.chapter = firstPartTableContents.chapter
        this.episode = firstPartTableContents.petDiary.length;
        this.title = firstPartTableContents.petDiary[this.episode].title;
        this.contents = firstPartTableContents.petDiary[this.episode].contents;
        this.date = dateMethod.toStringByFormatting(firstPartTableContents.petDiary[this.episode].date);
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