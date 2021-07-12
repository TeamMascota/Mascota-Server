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
const SecondPartTableContent_1 = __importDefault(require("../../models/tableContents/SecondPartTableContent"));
const UserDiary_1 = __importDefault(require("../../models/diary/UserDiary"));
const User_1 = __importDefault(require("../../models/user/User"));
const SecondPartMainPageResDto_1 = require("../../dto/secondPart/SecondPartMainPageResDto");
const SecondPartDiariesOfMonthResDto_1 = require("../../dto/secondPart/SecondPartDiariesOfMonthResDto");
const SecondPartChapterListResDto_1 = require("../../dto/secondPart/SecondPartChapterListResDto");
const TableContents_1 = __importDefault(require("../../models/tableContents/TableContents"));
const dateMethod = require("../../modules/dateMethod");
require('../../models/tableContents/FirstPartTableContents');
require('../../models/tableContents/SecondPartTableContent');
require('../../models/diary/PetDiary');
require('../../models/diary/UserDiary');
require('../../models/diary/PetEmotions');
require('../../models/book/Book');
module.exports = {
    getMainPage: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield User_1.default.findById(userId).populate({
                path: "book",
                populate: ({
                    path: "tableContents",
                    populate: ({
                        path: "secondPartTableContents",
                        populate: ({
                            path: "userDiary"
                        })
                    })
                })
            });
            const epilogue = user.book.tableContents.secondPartTableContents[0];
            const checkFirst = user.book.tableContents.secondPartTableContents.map(tableContents => tableContents.userDiary);
            let check = false;
            checkFirst.forEach(x => {
                if (x.length > 1)
                    check = true;
            });
            let sortSecondPartTableContents = [];
            if (check) {
                sortSecondPartTableContents = user.book.tableContents.secondPartTableContents.filter(secondPartTableContents => secondPartTableContents.userDiary.length > 1).sort((a, b) => b.chapter - a.chapter)[0].userDiary.sort((a, b) => b.episode - a.episode);
            }
            else {
                sortSecondPartTableContents.push({
                    nextEpisode: 1,
                    episode: 0,
                    title: epilogue.title,
                    contents: epilogue.contents,
                    date: user.book.tableContents.secondPartStartDate
                });
            }
            return new SecondPartMainPageResDto_1.SecondPartMainPageResDto(user, sortSecondPartTableContents[0]);
        }
        catch (err) {
            throw err;
        }
    }),
    getDiaryOfTableContents: (tableContentsId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const tableContents = yield SecondPartTableContent_1.default.findById(tableContentsId).populate({
                path: "userDiary"
            });
            const test = tableContents.userDiary.filter(userDiary => userDiary.date.getMonth() == 6);
            const secondPartDiariesOfMonth = [];
            for (let i = 12; i > 0; i--) {
                if ((tableContents.userDiary.map(diary => diary.date.getMonth() == i)).includes(true)) {
                    const filteringDiaries = tableContents.userDiary.filter(userDiary => userDiary.date.getMonth() == i);
                    secondPartDiariesOfMonth.push(new SecondPartDiariesOfMonthResDto_1.SecondPartDiariesOfMonth(i + 1, filteringDiaries));
                }
            }
            return new SecondPartDiariesOfMonthResDto_1.SecondPartDiariesOfMonthResDto(tableContents, secondPartDiariesOfMonth);
        }
        catch (err) {
            throw err;
        }
    }),
    getSecondPartChapterList: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const chapterList = yield SecondPartTableContent_1.default.find();
            return new SecondPartChapterListResDto_1.SecondPartChapterListResDto(chapterList);
        }
        catch (err) {
            throw err;
        }
    }),
    addSecondPartChapter: (chapterData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let newChapter = new SecondPartTableContent_1.default({
                title: chapterData.chapterTitle,
                chapter: yield getNextChapter()
            });
            yield newChapter.save();
            const tableContents = (yield TableContents_1.default.find())[0];
            yield tableContents.setSecondPartTableContents(newChapter);
            yield tableContents.save();
        }
        catch (err) {
            throw err;
        }
        function getNextChapter() {
            return __awaiter(this, void 0, void 0, function* () {
                const secondPartTableContents = (yield SecondPartTableContent_1.default.find());
                const secondPartLength = secondPartTableContents.length;
                return secondPartTableContents[secondPartLength - 1].chapter + 1;
            });
        }
    }),
    modifySecondPartChapterInfo: (chapterId, modifyChapterData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield SecondPartTableContent_1.default.update({ _id: chapterId }, { $set: { title: modifyChapterData.chapterTitle } });
        }
        catch (err) {
            throw err;
        }
    }),
    deleteSecondPartChapter: (chapterId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //삭제하고자하는 2부 목차
            const findSecondPartChapter = yield SecondPartTableContent_1.default.findById(chapterId).populate({
                path: "userDiary"
            });
            if (findSecondPartChapter === null) {
                throw { statusCode: 400 };
            }
            //전체 2부 목차
            const tableContents = (yield TableContents_1.default.find().populate({
                path: "secondPartTableContents"
            }))[0];
            //삭제할 2부 목차의 chapter보다 큰 챕터 배열 & chapter -1씩 줄임 & 저장
            tableContents.secondPartTableContents.filter(secondPartTable => secondPartTable.chapter > findSecondPartChapter.chapter).forEach((secondPartTable) => __awaiter(void 0, void 0, void 0, function* () {
                secondPartTable.chapter -= 1;
                yield secondPartTable.save();
            }));
            //2부 목차에서 해당 목차 삭제
            yield SecondPartTableContent_1.default.deleteOne({ _id: `${chapterId}` });
            //2부 목차에 들어있던 userDiary 삭제
            const userDiaries = findSecondPartChapter.userDiary;
            userDiaries.forEach((userDiary) => __awaiter(void 0, void 0, void 0, function* () {
                yield UserDiary_1.default.deleteOne({ _id: `${userDiary._id}` });
            }));
            //총 목차(1부,2부)에서 해당 목차 secondPartTableContents배열에서 삭제
            const idx = tableContents.secondPartTableContents.findIndex(secondPartTable => secondPartTable._id == chapterId);
            tableContents.secondPartTableContents.splice(idx, 1);
            yield tableContents.save();
        }
        catch (err) {
            throw err;
        }
    })
};
//# sourceMappingURL=secondPartService.js.map