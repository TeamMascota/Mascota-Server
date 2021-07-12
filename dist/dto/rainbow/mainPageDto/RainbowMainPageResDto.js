"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpResDto = exports.MemoriesResDto = exports.RainbowMainPageResDto = void 0;
class RainbowMainPageResDto {
    constructor(book, isRainbowPet, rainbowButtonCheck) {
        this.rainbowMainPage = {
            title: null,
            bookImg: null,
            rainbowCheck: false,
            memories: [],
            help: []
        };
        this.rainbowMainPage.title = isRainbowPet ? "우리들의 무지개" : "무지개 준비하기"; //작가와 무지개다리를 건넌 동물의 이름 합친거
        this.rainbowMainPage.bookImg = book.imgs;
        this.rainbowMainPage.rainbowCheck = rainbowButtonCheck;
    }
    setMemories(memories) {
        this.rainbowMainPage.memories = memories;
    }
    setHelp(helps) {
        this.rainbowMainPage.help = helps;
    }
}
exports.RainbowMainPageResDto = RainbowMainPageResDto;
class MemoriesResDto {
    constructor(petDiaries, petId) {
        const diaryIndex = this.getRandomMemoryIndex(petDiaries.length);
        const randomDiary = petDiaries[diaryIndex];
        console.log("랜덤된 petEmotion " + randomDiary.petEmotions.filter(petEmotion => petEmotion.pet == petId)[0]);
        this.title = randomDiary.title;
        this.contents = randomDiary.contents;
        this.date = randomDiary.date;
        this.feeling = randomDiary.petEmotions.filter(petEmotion => petEmotion.pet == petId)[0].feeling;
    }
    getRandomMemoryIndex(max) {
        let min = Math.ceil(0);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}
exports.MemoriesResDto = MemoriesResDto;
class HelpResDto {
    constructor(help) {
        this.classification = help.classification;
        this.title = help.title;
        this.url = help.url;
    }
}
exports.HelpResDto = HelpResDto;
//# sourceMappingURL=RainbowMainPageResDto.js.map