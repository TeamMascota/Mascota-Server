"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecondPartBookResDto = exports.TableContentsResDto = exports.DiaryResDto = exports.FirstPartMainPageResDto = void 0;
const dateMethod = require('../../../modules/dateMethod');
class FirstPartMainPageResDto {
    constructor(book) {
        this.firstPartMainPage = {
            title: null,
            bookImg: null,
            diary: {},
            tableContents: [],
            secondPartBook: null
        };
        this.firstPartMainPage.title = book.title;
        this.firstPartMainPage.bookImg = book.imgs;
    }
    //가장 최근 일기 작성(기분X)
    setDiary(diary) {
        this.firstPartMainPage.diary = diary;
    }
    setTableContents(tableContents) {
        this.firstPartMainPage.tableContents.push(tableContents);
    }
    setSecondPartBook(user) {
        this.firstPartMainPage.secondPartBook = new SecondPartBookResDto(user);
    }
}
exports.FirstPartMainPageResDto = FirstPartMainPageResDto;
class DiaryResDto {
    //가장 마지막 화 들어감
    constructor(petDiary) {
        this.init(petDiary);
    }
    init(petDiary) {
        return __awaiter(this, void 0, void 0, function* () {
            const firstPartTableContents = petDiary.tableContents;
            this.chapter = firstPartTableContents.chapter;
            this.episode = firstPartTableContents.petDiary.length;
            //if(this.chapter==0){
            //    this._id="60ed3acde5003a744892ce27"
            //}else{
            this._id = petDiary._id;
            //}
            this.title = petDiary.title;
            this.contents = petDiary.contents;
            this.date = yield dateMethod.toStringByFormatting(petDiary.date);
        });
    }
}
exports.DiaryResDto = DiaryResDto;
class TableContentsResDto {
    constructor(firstPartTableContents) {
        this.chapterId = firstPartTableContents._id; //목차 Id
        this.chapterTitle = firstPartTableContents.title;
        this.chapter = firstPartTableContents.chapter;
        this.episodePerchapterCount = firstPartTableContents.petDiary.length;
    }
}
exports.TableContentsResDto = TableContentsResDto;
class SecondPartBookResDto {
    constructor(user) {
        this.init(user);
    }
    init(user) {
        return __awaiter(this, void 0, void 0, function* () {
            this.userId = user._id;
            this.imgs = user.book.imgs;
            this.author = user.book.author;
            this.date = yield dateMethod.toStringByFormatting(user.book.date);
        });
    }
}
exports.SecondPartBookResDto = SecondPartBookResDto;
//# sourceMappingURL=FirstPartMainPageResDto.js.map