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
exports.FeelingListDto = exports.PetDiaryPageResDto = void 0;
require("../../models/user/User");
require("../../models/book/Book");
require("../../models/pet/Pet");
require('../../models/tableContents/TableContents');
require('../../models/tableContents/FirstPartTableContents');
const dateMethod = require('../../modules/dateMethod');
class PetDiaryPageResDto {
    constructor(petDiary) {
        this.petDiary = {
            _id: null,
            //chapter:null,
            episode: null,
            title: null,
            bookImg: [],
            date: null,
            contents: null,
            timeTogether: null,
            // kind: null,
            feelingList: []
            //feeling,kind,img
        };
        this.init(petDiary);
    }
    init(petDiary) {
        return __awaiter(this, void 0, void 0, function* () {
            this.petDiary._id = petDiary._id;
            //this.petDiaryPage.chapter=temp.chapter
            this.petDiary.title = petDiary.title;
            this.petDiary.bookImg = petDiary.imgs;
            this.petDiary.date = yield dateMethod.toKoreanByFormatting(petDiary.date);
            this.petDiary.episode = petDiary.episode;
            this.petDiary.contents = petDiary.contents;
            // this.petDiary.kind = petDiary.pets[0].kind
            this.petDiary.timeTogether = yield dateMethod.getElapsedDay(petDiary.pets[0].startDate);
        });
    }
    setFeelingList(feelingList) {
        this.petDiary.feelingList.push(feelingList);
    }
}
exports.PetDiaryPageResDto = PetDiaryPageResDto;
class FeelingListDto {
    constructor(pet) {
        this.feeling = null;
        this.kind = null;
        this.petImgs = null;
        this.kind = pet.kind;
        this.petImgs = pet.imgs;
    }
    setFeeling(emotion) {
        this.feeling = emotion.feeling;
    }
}
exports.FeelingListDto = FeelingListDto;
//# sourceMappingURL=PetDiaryPageResDto.js.map