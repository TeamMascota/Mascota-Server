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
    constructor(firstPartTableContents) {
        console.log('bbbbbb : ' + firstPartTableContents);
        this.init(firstPartTableContents);
    }
    init(firstPartTableContents) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('!!!!!!!!!!!!!!! : ' + firstPartTableContents);
            this.chapter = firstPartTableContents.chapter;
            this.episode = firstPartTableContents.petDiary.length;
            console.log('@@@@@@@ : ' + this.episode);
            console.log('######## : ' + firstPartTableContents.petDiary[this.episode - 1]);
            this._id = firstPartTableContents.petDiary[this.episode - 1]._id;
            this.title = firstPartTableContents.petDiary[this.episode - 1].title;
            this.contents = firstPartTableContents.petDiary[this.episode - 1].contents;
            this.date = yield dateMethod.toStringByFormatting(firstPartTableContents.petDiary[this.episode - 1].date);
        });
    }
}
exports.DiaryResDto = DiaryResDto;
class TableContentsResDto {
    constructor(firstPartTableContents) {
        this.chapterId = firstPartTableContents._id; //목차 Id
        this.chapter = firstPartTableContents.chapter;
        this.chapterName = firstPartTableContents.title;
        this.episodePerchapterCount = firstPartTableContents.petDiary.length < 1 ? 0 : firstPartTableContents.petDiary.length;
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