"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChapterResDto = exports.ChapterListResDto = void 0;
require("../../models/user/User");
require("../../models/book/Book");
require("../../models/pet/Pet");
require('../../models/tableContents/TableContents');
require('../../models/tableContents/FirstPartTableContents');
const dateMethod = require('../../modules/dateMethod');
class ChapterListResDto {
    constructor() {
        this.tableContents = [];
    }
    setChapterList(chapter) {
        this.tableContents.push(chapter);
    }
}
exports.ChapterListResDto = ChapterListResDto;
class ChapterResDto {
    constructor(firstPartTableContents) {
        this.chapterId = null;
        this.chapter = null;
        this.chapterTitle = null;
        this.chapterId = firstPartTableContents._id;
        this.chapter = firstPartTableContents.chapter;
        this.chapterTitle = firstPartTableContents.title;
    }
}
exports.ChapterResDto = ChapterResDto;
//# sourceMappingURL=ChapterList.js.map