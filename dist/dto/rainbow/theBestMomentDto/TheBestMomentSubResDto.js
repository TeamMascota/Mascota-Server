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
exports.TheBestMomentSubResDto = void 0;
const dateMethod = require("../../../modules/dateMethod");
class TheBestMomentSubResDto {
    constructor(pet, theBestMoment) {
        this.init(pet, theBestMoment);
    }
    init(pet, theBestMoment) {
        return __awaiter(this, void 0, void 0, function* () {
            this.rainbowComment = `작가님과 함께했던 ${yield dateMethod.getElapsedDay(pet.startDate)}일의 시간동안\n${pet.name}는 의젓하고 당당한 ${pet.name}으로써\n행복한 인생을 보낼 수 있었어요.\n이젠 ${pet.name}가 느꼇던 최고의 순간들을\n모아봤어요!`;
            this.rainbowBestMoment = theBestMoment;
        });
    }
}
exports.TheBestMomentSubResDto = TheBestMomentSubResDto;
//# sourceMappingURL=TheBestMomentSubResDto.js.map