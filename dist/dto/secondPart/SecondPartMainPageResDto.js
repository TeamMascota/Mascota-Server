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
exports.SecondPartMainPageFirstPartBook = exports.SecondPartMainPageTableContents = exports.SecondPartMainPageDiary = exports.SecondPartMainPageResDto = void 0;
require('../../models/tableContents/SecondPartTableContent');
const dateMethod = require('../../modules/dateMethod');
class SecondPartMainPageResDto {
    constructor(user, sortUserDiary) {
        this.secondPartMainPage = {
            //private author = null,
            title: null,
            bookImg: null,
            diary: null,
            tableContents: [],
            firstPartBook: null,
            nextEpisode: null
        };
        //this.author = user.book.author
        this.secondPartMainPage.bookImg = user.book.imgs;
        this.secondPartMainPage.title = user.book.title;
        this.secondPartMainPage.tableContents = user.book.tableContents.secondPartTableContents.map(secondPartTableContents => new SecondPartMainPageTableContents(secondPartTableContents));
        this.secondPartMainPage.firstPartBook = new SecondPartMainPageFirstPartBook(user.book);
        this.setNextEpisode(sortUserDiary);
    }
    setDiary(diary) {
        console.log('2222222 :', diary);
        this.secondPartMainPage.diary = diary;
    }
    setNextEpisode(sortUserDiary) {
        this.secondPartMainPage.nextEpisode = sortUserDiary.episode + 1;
    }
}
exports.SecondPartMainPageResDto = SecondPartMainPageResDto;
class SecondPartMainPageDiary {
    constructor(chapter, sortUserDiary) {
        this.episode = null;
        this.title = null;
        this.contents = null;
        this.date = null;
        this._id = null;
        this.chapter = null;
        //console.log("!!!!!",sortUserDiary)
        this.init(chapter, sortUserDiary);
    }
    init(chapter, sortUserDiary) {
        return __awaiter(this, void 0, void 0, function* () {
            this._id = sortUserDiary._id;
            this.episode = sortUserDiary.episode;
            this.title = sortUserDiary.title;
            this.contents = sortUserDiary.contents;
            this.chapter = chapter;
            this.date = yield dateMethod.toStringByFormatting(sortUserDiary.date);
        });
    }
}
exports.SecondPartMainPageDiary = SecondPartMainPageDiary;
class SecondPartMainPageTableContents {
    constructor(secondPartTableContents) {
        this.chapter = null;
        this.chapterTitle = null;
        this.episodePerChapterCount = null;
        this.chapterId = null;
        this.chapter = secondPartTableContents.chapter;
        this.chapterTitle = secondPartTableContents.title;
        this.chapterId = secondPartTableContents._id;
        this.episodePerChapterCount = secondPartTableContents.userDiary.length;
    }
}
exports.SecondPartMainPageTableContents = SecondPartMainPageTableContents;
class SecondPartMainPageFirstPartBook {
    constructor(book) {
        this.userId = null;
        this.bookImg = null;
        this.author = null;
        this.date = null;
        this.init(book);
    }
    init(book) {
        return __awaiter(this, void 0, void 0, function* () {
            this.userId = book._id;
            this.bookImg = book.imgs;
            this.author = book.author;
            this.date = yield dateMethod.toStringByFormatting(book.date);
        });
    }
}
exports.SecondPartMainPageFirstPartBook = SecondPartMainPageFirstPartBook;
//# sourceMappingURL=SecondPartMainPageResDto.js.map