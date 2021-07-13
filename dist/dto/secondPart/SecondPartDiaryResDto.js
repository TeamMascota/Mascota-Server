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
exports.SecondPartDiaryResDto = void 0;
require("../../models/user/User");
require("../../models/book/Book");
require("../../models/pet/Pet");
require('../../models/tableContents/TableContents');
require('../../models/tableContents/SecondPartTableContent');
const dateMethod = require('../../modules/dateMethod');
class SecondPartDiaryResDto {
    constructor(userDiary) {
        this.secondPartDiary = {
            _id: null,
            episode: null,
            title: null,
            diaryImg: [],
            date: null,
            contents: null,
            feelingList: []
        };
        this.init(userDiary);
    }
    init(userDiary) {
        return __awaiter(this, void 0, void 0, function* () {
            this.secondPartDiary._id = userDiary._id;
            this.secondPartDiary.title = userDiary.title;
            this.secondPartDiary.diaryImg = userDiary.imgs;
            this.secondPartDiary.date = yield dateMethod.toKoreanByFormatting(userDiary.date);
            this.secondPartDiary.episode = userDiary.episode;
            this.secondPartDiary.contents = userDiary.contents;
            this.secondPartDiary.feelingList[0] = {
                kind: 0,
                petImgs: null,
                feeling: userDiary.feeling
            };
        });
    }
}
exports.SecondPartDiaryResDto = SecondPartDiaryResDto;
//# sourceMappingURL=SecondPartDiaryResDto.js.map