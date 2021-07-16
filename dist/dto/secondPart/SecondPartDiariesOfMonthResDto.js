"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecondPartDiaries = exports.SecondPartDiariesOfMonth = exports.SecondPartDiariesOfMonthResDto = void 0;
class SecondPartDiariesOfMonthResDto {
    constructor(tableContents, secondPartyDiariesOfMonth) {
        this._id = null;
        this.chapter = null;
        this.chapterTitle = null;
        this.diariesOfMonth = null;
        this._id = tableContents._id;
        this.chapter = tableContents.chapter;
        this.chapterTitle = tableContents.title;
        this.diariesOfMonth = secondPartyDiariesOfMonth;
    }
}
exports.SecondPartDiariesOfMonthResDto = SecondPartDiariesOfMonthResDto;
class SecondPartDiariesOfMonth {
    constructor(month, userDiaries) {
        this.month = null;
        this.diaryCountOfTableContents = null;
        this.diaries = [];
        this.month = month;
        this.diaryCountOfTableContents = userDiaries.length;
        this.diaries = userDiaries.sort((a, b) => b.date.getDate() - a.date.getDate()).map(diary => new SecondPartDiaries(diary));
    }
}
exports.SecondPartDiariesOfMonth = SecondPartDiariesOfMonth;
class SecondPartDiaries {
    constructor(userDiary) {
        this.diaryId = null;
        this.days = null;
        this.dayOfWeek = null;
        this.feeling = null;
        this.kind = null;
        this.title = null;
        this.contents = null;
        this.img = null;
        const weeks = ["일", "월", "화", "수", "목", "금", "토"];
        this.diaryId = userDiary._id;
        this.days = userDiary.date.getDate();
        this.dayOfWeek = weeks[userDiary.date.getDay()];
        this.feeling = userDiary.feeling;
        this.kind = 0;
        this.title = userDiary.title;
        this.contents = userDiary.contents;
        this.img = userDiary.imgs[0];
    }
}
exports.SecondPartDiaries = SecondPartDiaries;
//# sourceMappingURL=SecondPartDiariesOfMonthResDto.js.map