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
exports.TheBestMomentDiary = exports.TheBestMoment = exports.TheBestMomentPetInformation = exports.TheBestMomentsResDto = void 0;
const dateMethod = require("../../../modules/dateMethod");
class TheBestMomentsResDto {
    constructor() {
        this.pet = {};
        this.theBestMoments = [];
    }
    setTheBestMoment(theBestMoment) {
        this.theBestMoments.push(theBestMoment);
    }
    setTheBestMomentPetInfo(petInfo) {
        this.pet = petInfo;
    }
}
exports.TheBestMomentsResDto = TheBestMomentsResDto;
class TheBestMomentPetInformation {
    constructor(pet) {
        this.name = null;
        this.kind = null;
        this.name = pet.name;
        this.kind = pet.kind;
    }
}
exports.TheBestMomentPetInformation = TheBestMomentPetInformation;
class TheBestMoment {
    constructor(commentPerFeeling, theBestMomentDiary) {
        this.comment = null;
        this.feeling = null;
        this.diaries = [];
        this.comment = commentPerFeeling.comments;
        this.feeling = commentPerFeeling.feeling;
        this.diaries = theBestMomentDiary;
    }
}
exports.TheBestMoment = TheBestMoment;
class TheBestMomentDiary {
    constructor(diaryPerFeeling) {
        this.diaryId = null;
        this.chapter = null;
        this.episode = null;
        this.title = null;
        this.contents = null;
        this.date = null;
        this.init(diaryPerFeeling);
    }
    init(diaryPerFeeling) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log('!!!!!!!!!!!!!!!!!!!!!!!!! : ' + diaryPerFeeling)
            if (diaryPerFeeling != undefined) {
                this.diaryId = diaryPerFeeling._id;
                this.chapter = diaryPerFeeling.tableContents.chapter;
                this.episode = diaryPerFeeling.episode;
                this.title = diaryPerFeeling.title;
                this.contents = diaryPerFeeling.contents;
                this.date = yield dateMethod.toStringByFormatting(diaryPerFeeling.date);
            }
        });
    }
}
exports.TheBestMomentDiary = TheBestMomentDiary;
//# sourceMappingURL=TheBestMomentResDto.js.map