"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecondPartChapterList = exports.SecondPartChapterListResDto = void 0;
class SecondPartChapterListResDto {
    constructor(secondPartChapterList) {
        this.tableContents = [];
        this.tableContents = secondPartChapterList.map(chapter => new SecondPartChapterList(chapter));
    }
}
exports.SecondPartChapterListResDto = SecondPartChapterListResDto;
class SecondPartChapterList {
    constructor(chapter) {
        this._id = null;
        this.chapter = null;
        this.title = null;
        this._id = chapter._id;
        this.chapter = chapter.chapter;
        this.title = chapter.title;
    }
}
exports.SecondPartChapterList = SecondPartChapterList;
//# sourceMappingURL=SecondPartChapterListResDto.js.map