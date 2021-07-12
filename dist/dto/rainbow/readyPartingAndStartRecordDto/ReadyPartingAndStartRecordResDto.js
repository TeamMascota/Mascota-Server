"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookInfoResDto = exports.ReadyPartingAndStartRecordResDto = void 0;
class ReadyPartingAndStartRecordResDto {
    constructor(diaryCount, dayTogether, bookInfo) {
        this.diaryCount = 0;
        this.dayTogether = 0;
        this.bookInfo = {};
        this.diaryCount = diaryCount;
        this.dayTogether = dayTogether;
        this.bookInfo = bookInfo;
    }
}
exports.ReadyPartingAndStartRecordResDto = ReadyPartingAndStartRecordResDto;
class BookInfoResDto {
    constructor(book) {
        this.title = null;
        this.bookImg = null;
        this.title = book.title;
        this.bookImg = book.imgs;
    }
}
exports.BookInfoResDto = BookInfoResDto;
//# sourceMappingURL=ReadyPartingAndStartRecordResDto.js.map