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
exports.SecondPartMainPageFirstPartBook = exports.SecondPartMainPageTableContents = exports.SecondPartMainPageDiary = exports.SecondPartMainPageMemory = exports.SecondPartMainPageResDto = void 0;
const dateMethod = require('../../modules/dateMethod');
class SecondPartMainPageResDto {
    constructor(user, sortUserDiary) {
        this.part = null;
        this.author = null;
        this.bookImg = null;
        this.memory = null;
        this.tableContents = null;
        this.firstPartBook = null;
        this.part = 2;
        this.author = user.book.author;
        this.bookImg = user.book.imgs;
        this.memory = new SecondPartMainPageMemory(sortUserDiary);
        this.tableContents = user.book.tableContents.secondPartTableContents.map(secondPartTableContents => new SecondPartMainPageTableContents(secondPartTableContents));
        this.firstPartBook = new SecondPartMainPageFirstPartBook(user.book);
    }
}
exports.SecondPartMainPageResDto = SecondPartMainPageResDto;
class SecondPartMainPageMemory {
    constructor(sortUserDiary) {
        this.diary = null;
        this.nextEpisode = null;
        this.diary = new SecondPartMainPageDiary(sortUserDiary);
        this.nextEpisode = sortUserDiary.episode + 1;
    }
}
exports.SecondPartMainPageMemory = SecondPartMainPageMemory;
class SecondPartMainPageDiary {
    constructor(sortUserDiary) {
        this.episode = null;
        this.title = null;
        this.contents = null;
        this.date = null;
        this.init(sortUserDiary);
    }
    init(sortUserDiary) {
        return __awaiter(this, void 0, void 0, function* () {
            this.episode = sortUserDiary.episode;
            this.title = sortUserDiary.title;
            this.contents = sortUserDiary.contents;
            this.date = yield dateMethod.toStringByFormatting(sortUserDiary.date);
        });
    }
}
exports.SecondPartMainPageDiary = SecondPartMainPageDiary;
class SecondPartMainPageTableContents {
    constructor(secondPartTableContents) {
        this.chapter = null;
        this.title = null;
        this.episodePerChapterCount = null;
        this._id = null;
        this.chapter = secondPartTableContents.chapter;
        this.title = secondPartTableContents.title;
        this._id = secondPartTableContents._id;
        this.episodePerChapterCount = secondPartTableContents.userDiary.length;
    }
}
exports.SecondPartMainPageTableContents = SecondPartMainPageTableContents;
class SecondPartMainPageFirstPartBook {
    constructor(book) {
        this._id = null;
        this.bookImg = null;
        this.author = null;
        this.date = null;
        this._id = book._id;
        this.bookImg = book.imgs;
        this.author = book.author;
        this.date = book.date;
    }
}
exports.SecondPartMainPageFirstPartBook = SecondPartMainPageFirstPartBook;
//# sourceMappingURL=SecondPartMainPageResDto.js.map