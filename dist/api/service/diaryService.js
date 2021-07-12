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
const Book_1 = __importDefault(require("../../models/book/Book"));
const TableContents_1 = __importDefault(require("../../models/tableContents/TableContents"));
const FirstPartTableContents_1 = __importDefault(require("../../models/tableContents/FirstPartTableContents"));
const Pet_1 = __importDefault(require("../../models/pet/Pet"));
const PetDiary_1 = __importDefault(require("../../models/diary/PetDiary"));
const PetEmotions_1 = __importDefault(require("../../models/diary/PetEmotions"));
const PetDiaryPageResDto_1 = require("../../dto/petDiary/PetDiaryPageResDto");
require("../../models/user/User");
require("../../models/book/Book");
require("../../models/pet/Pet");
require('../../models/tableContents/TableContents');
require('../../models/tableContents/FirstPartTableContents');
require('../../models/diary/PetDiary');
const util = require('../../modules/util');
const responseMessage = require('../../modules/responseMessage');
const statusCode = require('../../modules/statusCode');
module.exports = {
    postPrologue: (bookData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // add book info
            let book = yield Book_1.default.findById(bookData._id);
            book.title = bookData.title;
            book.imgs = bookData.image;
            book.author = bookData.userName;
            console.log(book);
            //add tableContents info
            let tc = yield new TableContents_1.default();
            let ftc = yield new FirstPartTableContents_1.default({
                chapter: 0,
                title: bookData.prologueTitle,
                contents: bookData.prologueContents
            });
            yield tc.setFirstPartTableContents(ftc);
            yield book.setTableContents(tc);
            //save db
            yield book.save();
            return responseMessage.SUCCESS_POST_PROLOGUE;
            //error handling
        }
        catch (err) {
            console.log(err);
            throw { statusCode: statusCode.BAD_REQUEST, responseMessage: responseMessage.NO_BOOK };
        }
    }),
    postPetDiary: (diaryData) => __awaiter(void 0, void 0, void 0, function* () {
        const writeDate = yield new Date(diaryData.date);
        writeDate.setDate(writeDate.getDate() + 1);
        // console.log(FirstPartTableContents.findById(diaryData._id))
        const temp = yield FirstPartTableContents_1.default.findById(diaryData._id).populate('petDiary');
        //console.log("temp:",temp,"end")
        let newPetDiary = new PetDiary_1.default({
            tableContents: diaryData._id,
            episode: temp.petDiary.length,
            date: writeDate,
            imgs: diaryData.diaryImages,
            title: diaryData.title,
            contents: diaryData.contents
        });
        try {
            //save petinfo
            let petN = diaryData.character.length;
            for (let i = 0; i < petN; i++) {
                const petData = yield Pet_1.default.findById(diaryData.character[0]._id).populate('_id');
                newPetDiary.setPet(petData);
                //save emotions
                const petEmotion = new PetEmotions_1.default({
                    pet: diaryData.character[0]._id,
                    feeling: diaryData.character[0].feeling
                });
                newPetDiary.setPetEmotions(petEmotion);
            }
            console.log(newPetDiary);
            yield newPetDiary.save();
            yield temp.setPetDiary(newPetDiary); //db관련은 await 붙이기(setter,save...)
            yield temp.save();
            console.log(temp._id);
            return responseMessage.SUCCESS_POST_PETDIARY;
        }
        catch (err) {
            console.log(err);
            throw { statusCode: statusCode.BAD_REQUEST, responseMessage: responseMessage.NO_DIARY };
        }
    }),
    getPetDiary: (petDiaryId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const findPetDiary = yield PetDiary_1.default.findById(petDiaryId).populate('pets').populate('tableContents').populate('petEmotions');
            let petDiaryPageResDto = yield new PetDiaryPageResDto_1.PetDiaryPageResDto(findPetDiary); //이부분
            for (let i = 0; i < findPetDiary.petEmotions.length; i++) {
                petDiaryPageResDto.setFeelingList(findPetDiary.petEmotions[i]);
            }
            return petDiaryPageResDto;
        }
        catch (err) {
            console.log(err);
            throw { statusCode: statusCode.BAD_REQUEST, responseMessage: responseMessage.NO_DIARY };
        }
    }),
    putPetDiary: (petDiaryId, diaryData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let findPetDiary = yield PetDiary_1.default.findById(petDiaryId);
            findPetDiary.tableContents = findPetDiary.tableContents;
            findPetDiary.episode = findPetDiary.episode;
            findPetDiary.date = findPetDiary.date;
            findPetDiary.imgs = diaryData.diaryImages;
            findPetDiary.title = diaryData.title;
            findPetDiary.contents = diaryData.contents;
            //save petinfo
            let petN = diaryData.character.length;
            for (let i = 0; i < petN; i++) {
                const petData = yield Pet_1.default.findById(diaryData.character[i]._id).populate('_id');
                findPetDiary.setPet(petData);
                //save emotions
                let emotion = new PetEmotions_1.default();
                emotion.pet = diaryData.character[i]._id;
                emotion.feeling = diaryData.character[i].feeling;
                emotion.setPetDiary(findPetDiary);
                yield emotion.save();
            }
            yield findPetDiary.save();
            return responseMessage.SUCCESS_EDIT_PETDIARY;
        }
        catch (err) {
            console.log(err);
            throw { statusCode: statusCode.BAD_REQUEST, responseMessage: responseMessage.NO_DIARY };
        }
    }),
    deletePetDiary: (petDiaryId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let findPetDiary = yield PetDiary_1.default.findById(petDiaryId).populate('tableContents');
            console.log(findPetDiary);
            //화 정렬 순서 맞추기
            //해당 목차인것들 모두 가져오기. findPetDiary의 idx 뒤로 다 -1
            // let allDiaries=await (PetDiary.find({}).populate('tableContents'))
            let petDiaries = (yield FirstPartTableContents_1.default.findOne({ chapter: { $eq: findPetDiary.tableContents.chapter } })).petDiary;
            for (let i = 0; i < petDiaries.length; i++) {
                let temp = yield PetDiary_1.default.findById(petDiaries[i]);
                if (findPetDiary.episode <= temp.episode) {
                    temp.episode = Number(temp.episode) - 1;
                    yield temp.save();
                }
            }
            yield PetDiary_1.default.deleteOne({ _id: findPetDiary });
            console.log(findPetDiary);
            return responseMessage.SUCCESS_DELETE_PETDIARY;
        }
        catch (err) {
            console.log(err);
            throw { statusCode: statusCode.BAD_REQUEST, responseMessage: responseMessage.NO_DIARY };
        }
    })
};
//# sourceMappingURL=diaryService.js.map