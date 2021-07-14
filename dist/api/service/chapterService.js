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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TableContents_1 = __importDefault(require("../../models/tableContents/TableContents"));
const FirstPartTableContents_1 = __importDefault(require("../../models/tableContents/FirstPartTableContents"));
const PetChapterDiary_1 = require("../../dto/petChapter/PetChapterDiary");
const User_1 = __importDefault(require("../../models/user/User"));
const ChapterList_1 = require("../../dto/petChapter/ChapterList");
require("../../models/user/User");
require("../../models/book/Book");
require("../../models/pet/Pet");
require('../../models/tableContents/TableContents');
require('../../models/tableContents/FirstPartTableContents');
require('../../models/diary/PetDiary');
require('../../models/diary/PetEmotions');
const util = require('../../modules/util');
const responseMessage = require('../../modules/responseMessage');
const statusCode = require('../../modules/statusCode');
module.exports = {
    getChapterDiary: (chapterId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //챕터 id로 1부 목차
            const findFirstTableContents = yield FirstPartTableContents_1.default.findById(chapterId).populate({ path: "petDiary", populate: ({ path: "petEmotions pets" }) });
            //.populate({path:"petDiary",populate:({path:"petEmotions"})})
            let newChapterDiary = new PetChapterDiary_1.PetChapterDiaryResDto(findFirstTableContents);
            //월별로 자르기
            for (let m = 12; m >= 1; m--) {
                let cnt = 0;
                //1화부터
                let monthly = new PetChapterDiary_1.MonthlyDiaryResDto();
                for (let i = 0; i < findFirstTableContents.petDiary.length; i++) {
                    if (m == findFirstTableContents.petDiary[i].date.getMonth()) {
                        cnt++;
                        let newDiary = new PetChapterDiary_1.DiariesResDto(findFirstTableContents.petDiary[i]); //diary                     
                        monthly.setDiaries(newDiary);
                        //console.log(findFirstTableContents.petDiary[i].petEmotions[0].feeling)
                    }
                }
                if (cnt == 0)
                    continue;
                monthly.setMonthCount(cnt);
                monthly.setMonth(m);
                newChapterDiary.setMonthly(monthly);
            }
            console.log(newChapterDiary);
            return newChapterDiary;
        }
        catch (err) {
            console.log(err);
            throw { statusCode: statusCode.BAD_REQUEST, responseMessage: responseMessage.NO_DIARY };
        }
    }),
    getChapterList: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const findUserChapter = yield User_1.default.findById(userId).populate({ path: "book", populate: ({ path: "tableContents", populate: ({ path: "firstPartTableContents" }) }) });
        let chapterList = new ChapterList_1.ChapterListResDto();
        for (let i = 0; i < findUserChapter.book.tableContents.firstPartTableContents.length; i++) {
            let newChapter = new ChapterList_1.ChapterResDto(new FirstPartTableContents_1.default(findUserChapter.book.tableContents.firstPartTableContents[i]));
            chapterList.setChapterList(newChapter);
        }
        console.log(chapterList);
        return chapterList;
    }),
    postChapterList: (userId, chapterTitle) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const findUserChapter = yield User_1.default.findById(userId).populate({ path: "book", populate: ({ path: "tableContents", populate: ({ path: "firstPartTableContents" }) }) });
            const newFirstPartTable = new FirstPartTableContents_1.default(); //chapter,title
            console.log(findUserChapter);
            console.log(chapterTitle);
            let max = 0;
            for (let i = 0; i < findUserChapter.book.tableContents.firstPartTableContents.length; i++) {
                if (max < findUserChapter.book.tableContents.firstPartTableContents[i].chapter) {
                    max = Number(findUserChapter.book.tableContents.firstPartTableContents[i].chapter);
                }
            }
            newFirstPartTable.chapter = max + 1;
            newFirstPartTable.title = chapterTitle;
            yield newFirstPartTable.save();
            findUserChapter.book.tableContents.firstPartTableContents.push(newFirstPartTable);
            let newTableContents = new TableContents_1.default(findUserChapter.book.tableContents);
            yield newTableContents.save();
            console.log(newTableContents);
            let chapterList = new ChapterList_1.ChapterListResDto();
            for (let i = 0; i < findUserChapter.book.tableContents.firstPartTableContents.length; i++) {
                let newChapter = new ChapterList_1.ChapterResDto(new FirstPartTableContents_1.default(findUserChapter.book.tableContents.firstPartTableContents[i]));
                chapterList.setChapterList(newChapter);
            }
            console.log(chapterList);
            return chapterList;
        }
        catch (err) {
            console.log(err);
            throw { statusCode: statusCode.BAD_REQUEST, responseMessage: responseMessage.NO_CONTENTS };
        }
    }),
    putChapterList: (chapterId, chapterTitle) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const findChapter = yield FirstPartTableContents_1.default.findById(chapterId);
            findChapter.title = chapterTitle;
            const editFirstPartTableContents = new FirstPartTableContents_1.default(findChapter);
            yield editFirstPartTableContents.save();
            console.log(editFirstPartTableContents);
            let chapterList = new ChapterList_1.ChapterListResDto();
            let tableContents = yield TableContents_1.default.find({}).populate('firstPartTableContents');
            for (let i = 0; i < tableContents[0].firstPartTableContents.length; i++) {
                let newChapter = new ChapterList_1.ChapterResDto(new FirstPartTableContents_1.default(tableContents[0].firstPartTableContents[i]));
                chapterList.setChapterList(newChapter);
            }
            //   console.log(chapterList)
            return chapterList;
        }
        catch (err) {
            console.log(err);
            throw { statusCode: statusCode.BAD_REQUEST, responseMessage: responseMessage.NO_CONTENTS };
        }
    }),
    deleteChapterList: (chapterId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let findChapter = yield FirstPartTableContents_1.default.findById(chapterId);
            const curChapter = findChapter.chapter;
            const allFirstTableContents = yield FirstPartTableContents_1.default.find({});
            let updateFTC = new FirstPartTableContents_1.default();
            //해당 목차보다 큰 목차 -=1
            for (let i = 0; i < allFirstTableContents.length; i++) {
                if (allFirstTableContents[i].chapter > curChapter) {
                    allFirstTableContents[i].chapter = Number(allFirstTableContents[i].chapter) - 1;
                }
                //db save
                updateFTC = allFirstTableContents[i];
                yield updateFTC.save();
            }
            console.log(allFirstTableContents);
            //해당 목차 삭제
            yield FirstPartTableContents_1.default.deleteOne({ _id: chapterId });
            const tableContents = (yield TableContents_1.default.find())[0];
            for (let j = 0; j < tableContents.firstPartTableContents.length; j++) {
                if (tableContents.firstPartTableContents[j] == chapterId) {
                    tableContents.firstPartTableContents.splice(j, 1);
                }
            }
            yield tableContents.save();
            let chapterList = new ChapterList_1.ChapterListResDto();
            let allTableContents = yield TableContents_1.default.find({}).populate('firstPartTableContents');
            for (let i = 0; i < allTableContents[0].firstPartTableContents.length; i++) {
                let newChapter = new ChapterList_1.ChapterResDto(new FirstPartTableContents_1.default(allTableContents[0].firstPartTableContents[i]));
                chapterList.setChapterList(newChapter);
            }
            console.log(chapterList);
            return chapterList;
        }
        catch (err) {
            console.log(err);
            throw { statusCode: statusCode.BAD_REQUEST, responseMessage: responseMessage.NO_CONTENTS };
        }
    })
};
//# sourceMappingURL=chapterService.js.map