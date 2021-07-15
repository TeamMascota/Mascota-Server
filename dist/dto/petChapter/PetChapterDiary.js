"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiariesResDto = exports.MonthlyDiaryResDto = exports.PetChapterDiaryResDto = void 0;
require("../../models/user/User");
require("../../models/book/Book");
require("../../models/pet/Pet");
require('../../models/tableContents/TableContents');
require('../../models/tableContents/FirstPartTableContents');
const dateMethod = require('../../modules/dateMethod');
class PetChapterDiaryResDto {
    constructor(firstPartTableContents) {
        this.petChapterDiary = {
            chapterId: null,
            chapter: null,
            chapterTitle: null,
            monthly: [],
        };
        this.petChapterDiary.chapterId = firstPartTableContents._id;
        this.petChapterDiary.chapter = firstPartTableContents.chapter;
        this.petChapterDiary.chapterTitle = firstPartTableContents.title;
    }
    setMonthly(monthly) {
        this.petChapterDiary.monthly.push(monthly);
    }
}
exports.PetChapterDiaryResDto = PetChapterDiaryResDto;
class MonthlyDiaryResDto {
    constructor() {
        this.episodePerMonthCount = null;
        this.month = null;
        this.diaries = [];
    }
    setMonthCount(monthCount) { this.episodePerMonthCount = monthCount; }
    setMonth(month) { this.month = month; }
    setDiaries(diary) {
        this.diaries.push(diary);
    }
}
exports.MonthlyDiaryResDto = MonthlyDiaryResDto;
class DiariesResDto {
    constructor(diary) {
        this.diaryId = null;
        this.title = null;
        this.contents = null;
        this.episode = null;
        this.image = null;
        this.feelingCount = null;
        this.feeling = null;
        this.date = null;
        this.weekday = null;
        this.kind = null;
        const week = new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일');
        console.log('test : ' + diary._id);
        this.diaryId = diary._id;
        this.title = diary.title;
        this.contents = diary.contents;
        this.episode = diary.episode;
        this.image = diary.imgs[0]; //가장 첫번째 사진
        this.feelingCount = diary.petEmotions.length;
        this.feeling = diary.petEmotions[0].feeling;
        this.date = diary.date.getDate() + "일";
        console.log('요일 : ' + diary.date.getDay());
        this.weekday = week[diary.date.getDay()];
        this.kind = diary.pets[0].kind;
    }
    setFeeling(petEmotion) {
        this.feeling = petEmotion;
    }
}
exports.DiariesResDto = DiariesResDto;
//# sourceMappingURL=PetChapterDiary.js.map