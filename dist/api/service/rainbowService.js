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
const User_1 = __importDefault(require("../../models/user/User"));
const RainbowMainPageResDto_1 = require("../../dto/rainbow/mainPageDto/RainbowMainPageResDto");
const Help_1 = __importDefault(require("../../models/etc/Help"));
const RainbowPetResDto_1 = require("../../dto/rainbow/petDto/RainbowPetResDto");
const Pet_1 = __importDefault(require("../../models/pet/Pet"));
const PartingRainbowResDto_1 = require("../../dto/rainbow/partingDto/PartingRainbowResDto");
const ReadyPartingAndStartRecordResDto_1 = require("../../dto/rainbow/readyPartingAndStartRecordDto/ReadyPartingAndStartRecordResDto");
const FirstPartTableContents_1 = __importDefault(require("../../models/tableContents/FirstPartTableContents"));
const SecondPartTableContent_1 = __importDefault(require("../../models/tableContents/SecondPartTableContent"));
const PetEmotions_1 = __importDefault(require("../../models/diary/PetEmotions"));
const TheBestMomentResDto_1 = require("../../dto/rainbow/theBestMomentDto/TheBestMomentResDto");
const PetNameResDto_1 = require("../../dto/rainbow/petDto/PetNameResDto");
const TheBestMomentSubResDto_1 = require("../../dto/rainbow/theBestMomentDto/TheBestMomentSubResDto");
var dateMethod = require("../../modules/dateMethod");
var theBestMomentComments = require("../../modules/comment");
require("../../models/user/User");
require("../../models/pet/Pet");
require("../../models/book/Book");
require('../../models/tableContents/TableContents');
require('../../models/tableContents/FirstPartTableContents');
require('../../models/diary/PetDiary');
require('../../models/diary/PetEmotions');
require('../../models/tableContents/SecondPartTableContent');
require('../../models/diary/UserDiary');
require("../../models/etc/Help");
require("../../models/etc/Comments");
module.exports = {
    getMainPage: (userId, petId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const findUser = yield User_1.default.findById(userId).populate({
                path: "pets"
            }).populate({
                path: "book",
                populate: {
                    path: "tableContents",
                    populate: {
                        path: "firstPartTableContents",
                        populate: {
                            path: "petDiary",
                            populate: {
                                path: "petEmotions"
                            }
                        }
                    }
                }
            });
            const isRainbowPet = yield isRainbow(findUser.pets);
            const rainbowButtonCheck = yield rainbowCheck(findUser.pets);
            const rainbowMainPageResDto = new RainbowMainPageResDto_1.RainbowMainPageResDto(findUser.book, isRainbowPet, rainbowButtonCheck);
            const firstPartTableContents = findUser.book.tableContents.firstPartTableContents;
            const validMemories = firstPartTableContents.filter(tableContents => tableContents.petDiary.length > 0).map(tableContents => tableContents.petDiary.filter(petDiary => petDiary.pets.includes(petId)));
            console.log('validMemories : ' + validMemories);
            //validMemories : [tableContetns [petDiary]]
            let memoriesResDto = [null, null];
            console.log('validMemoriesLength : ' + validMemories.length);
            if (validMemories.length == 2) {
                memoriesResDto[0] = new RainbowMainPageResDto_1.MemoriesResDto(validMemories[0], petId);
                memoriesResDto[1] = new RainbowMainPageResDto_1.MemoriesResDto(validMemories[1], petId);
            }
            else if (validMemories.length > 2) {
                let firstTableContentsIndex = yield getRandomNumber(validMemories.length);
                let secondTableContentsIndex = yield getRandomNumber(validMemories.length);
                if (firstTableContentsIndex == secondTableContentsIndex) {
                    while (firstTableContentsIndex == secondTableContentsIndex) {
                        if (secondTableContentsIndex == firstTableContentsIndex) {
                            secondTableContentsIndex = yield getRandomNumber(validMemories.length);
                        }
                        else {
                            break;
                        }
                    }
                }
                memoriesResDto[0] = new RainbowMainPageResDto_1.MemoriesResDto(validMemories[firstTableContentsIndex], petId);
                memoriesResDto[1] = new RainbowMainPageResDto_1.MemoriesResDto(validMemories[secondTableContentsIndex], petId);
            }
            else if (validMemories.length == 1) {
                memoriesResDto[0] = new RainbowMainPageResDto_1.MemoriesResDto(validMemories[0], petId);
            }
            rainbowMainPageResDto.setMemories(memoriesResDto);
            //helpResDto
            const helps = yield Help_1.default.find();
            const helpResDto = helps.map(help => new RainbowMainPageResDto_1.HelpResDto(help));
            rainbowMainPageResDto.setHelp(helpResDto);
            return rainbowMainPageResDto;
        }
        catch (error) {
            throw error;
        }
        function getRandomNumber(max) {
            max = Math.floor(max);
            return Math.floor(Math.random() * max);
        }
        function isRainbow(pets) {
            let rainbow = false;
            pets.forEach(pet => {
                if (pet.rainbow === true) {
                    rainbow = true;
                }
            });
            return rainbow;
        }
        function rainbowCheck(pets) {
            let check = true;
            pets.forEach(pet => {
                if (pet.rainbow === false) {
                    check = false;
                }
            });
            return check;
        }
    }),
    selectPet: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const findUser = yield User_1.default.find().populate({
                path: "pets"
            });
            const rainbowPetResDto = new RainbowPetResDto_1.RainbowPetResDto(findUser[0].pets.filter(pet => !pet.rainbow).map(pet => new RainbowPetResDto_1.MyPetInfoResDto(pet)));
            return rainbowPetResDto;
        }
        catch (err) {
            throw err;
        }
    }),
    setPartingRainbowPet: (petId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const findPet = yield Pet_1.default.findById(petId).populate({
                path: "user",
                populate: {
                    path: "book",
                    populate: {
                        path: "tableContents",
                        populate: {
                            path: "firstPartTableContents"
                        }
                    }
                }
            });
            findPet.rainbow = true;
            yield findPet.save();
            const user = findPet.user;
            // for()
            let diaryCount = 0;
            user.book.tableContents.firstPartTableContents.forEach(tableContent => diaryCount += tableContent.petDiary.length);
            return new PartingRainbowResDto_1.PartingRainbowResDto(diaryCount, findPet);
        }
        catch (err) {
            throw err;
        }
    }),
    cancelPartingPet: (petId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const findPet = yield Pet_1.default.findById(petId);
            findPet.rainbow = false;
            yield findPet.save();
        }
        catch (err) {
            throw err;
        }
    }),
    getReadyPartingPetComment: (petId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const pet = yield Pet_1.default.findById(petId).populate({
                path: "user",
                populate: {
                    path: "book",
                    populate: {
                        path: "tableContents",
                        populate: {
                            path: "firstPartTableContents"
                        }
                    }
                }
            });
            const user = pet.user;
            const bookInfo = new ReadyPartingAndStartRecordResDto_1.BookInfoResDto(pet.user.book);
            let diaryCount = 0;
            user.book.tableContents.firstPartTableContents.forEach(tableContent => diaryCount += tableContent.petDiary.length);
            const startDate = pet.startDate;
            const dayTogether = yield dateMethod.getElapsedDay(startDate);
            return new ReadyPartingAndStartRecordResDto_1.ReadyPartingAndStartRecordResDto(diaryCount, dayTogether, bookInfo);
        }
        catch (err) {
            throw err;
        }
    }),
    getTheBestMoment: (userId, petId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const pet = yield Pet_1.default.findById(petId);
            const TheBestMomentPetInfo = new TheBestMomentResDto_1.TheBestMomentPetInformation(pet);
            const diaryPerFeeling = [];
            for (let i = 0; i < 6; i++) {
                const diaries = (yield PetEmotions_1.default.find({ "feeling": { $eq: i } }).select("petDiary").populate({ path: "petDiary", populate: ({ path: "tableContents" }) })).map(emotion => emotion.petDiary);
                if (diaries.length < 1) {
                    diaryPerFeeling.push(null);
                }
                else {
                    diaryPerFeeling.push(diaries);
                }
            }
            const theBestMomentsResDto = new TheBestMomentResDto_1.TheBestMomentsResDto();
            for (let j = 0; j < 6; j++) { //긍정3개, 부정3개
                //const commentPerFeeling = await Comments.findOne({ feeling: j , classification : 2})
                let commentPerFeeling = {
                    comments: "",
                    feeling: null,
                    tableContents: null
                };
                if (j == 0) {
                    commentPerFeeling.comments = yield theBestMomentComments.loveFeeling(pet.name);
                }
                else if (j == 1) {
                    commentPerFeeling.comments = yield theBestMomentComments.happyFeeling(pet.name);
                }
                else if (j == 2) {
                    commentPerFeeling.comments = yield theBestMomentComments.normalFeeling();
                }
                else if (j == 3) {
                    commentPerFeeling.comments = yield theBestMomentComments.angryFeeling(pet.name);
                }
                else if (j == 4) {
                    commentPerFeeling.comments = yield theBestMomentComments.gloomyFeeling();
                }
                else if (j == 5) {
                    commentPerFeeling.comments = yield theBestMomentComments.boringFeeling();
                }
                let theBestMoment = null;
                if (j < 3) {
                    console.log('positive');
                    theBestMoment = new TheBestMomentResDto_1.TheBestMoment(commentPerFeeling, getPositiveRadomDiary(diaryPerFeeling[j]));
                }
                else {
                    console.log('negative');
                    theBestMoment = new TheBestMomentResDto_1.TheBestMoment(commentPerFeeling, getNegativeRandomDiary(diaryPerFeeling[j]));
                }
                theBestMomentsResDto.setTheBestMoment(theBestMoment);
                theBestMomentsResDto.setTheBestMomentPetInfo(TheBestMomentPetInfo);
            }
            return theBestMomentsResDto;
        }
        catch (err) {
            throw err;
        }
        //각 기분에 따른 일기들을 배열로 묶어서 보내줘야함
        function getPositiveRadomDiary(diaries) {
            if (diaries === null)
                return null;
            const diaryLength = diaries.length;
            console.log('diaryLength : ' + diaryLength);
            const theBestMomentDiaries = [];
            if (diaryLength < 8) {
                for (let i = 0; i < diaryLength; i++) { //가지고 있는 일기 갯수만큼만 넣는다
                    theBestMomentDiaries.push(new TheBestMomentResDto_1.TheBestMomentDiary(diaries[i]));
                }
                for (let j = 0; j < 8 - diaryLength; j++) { //남은 일기갯수(8-가지고 있는 일기수)만큼 null로 채워준다
                    theBestMomentDiaries.push(null);
                }
            }
            else {
                //8개 이상의 일기중 8개만 골라서 넣어준다.
                const indexArray = [];
                while (indexArray.length < 8) {
                    let index = getRandomNumber(diaryLength);
                    if (!indexArray.includes(index)) {
                        indexArray.push(index);
                    }
                }
                for (let k = 0; k < 8; k++) {
                    theBestMomentDiaries.push(new TheBestMomentResDto_1.TheBestMomentDiary(diaries[indexArray[k]]));
                }
            }
            return theBestMomentDiaries;
        }
        //부정 일기는 2개씩만
        function getNegativeRandomDiary(diaries) {
            if (diaries === null)
                return null;
            const diaryLength = diaries.length;
            console.log('diaryLength : ' + diaryLength);
            const theBestMomentDiaries = [];
            if (diaryLength < 2) {
                for (let i = 0; i < diaryLength; i++) {
                    theBestMomentDiaries.push(new TheBestMomentResDto_1.TheBestMomentDiary(diaries[i]));
                }
                for (let j = 0; j < 2 - diaryLength; j++) {
                    theBestMomentDiaries.push(null);
                }
            }
            else {
                const indexArray = [];
                while (indexArray.length < 2) {
                    let index = getRandomNumber(diaryLength);
                    if (!indexArray.includes(index)) {
                        indexArray.push(index);
                    }
                }
                for (let k = 0; k < 2; k++) {
                    theBestMomentDiaries.push(new TheBestMomentResDto_1.TheBestMomentDiary(diaries[indexArray[k]]));
                }
            }
            return theBestMomentDiaries;
        }
        function getRandomNumber(max) {
            max = Math.floor(max);
            return Math.floor(Math.random() * max);
        }
    }),
    getPartingPetName: (petId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const pet = yield Pet_1.default.findById(petId);
            return new PetNameResDto_1.PetNameResDto(pet);
        }
        catch (err) {
            throw err;
        }
    }),
    postEpilogue: (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log('id : ' + userId);
            const test = yield User_1.default.findById(userId);
            console.log('test!!! : ' + test);
            const user = yield User_1.default.findById(userId).populate({
                path: "book",
                populate: ({
                    path: "tableContents",
                    populate: ({
                        path: "firstPartTableContents secondPartTableContents"
                    })
                })
            });
            console.log('user : ' + user);
            const tableContents = user.book.tableContents;
            //1부 목차 마지막에 에필로그
            const firstPartEpilogue = new FirstPartTableContents_1.default({
                chapter: -1,
                title: data.title,
                contents: data.contents
            });
            yield firstPartEpilogue.save();
            yield tableContents.firstPartTableContents.push(firstPartEpilogue);
            const isAlreadySecondPartTableContents = yield SecondPartTableContent_1.default.find(); //첫 반려동물이 무지개를 건넜는지 확인하기 위한 로직
            //2부 목차 처음에 에필로그
            const secondPartEpilogue = new SecondPartTableContent_1.default({
                chapter: 0,
                title: data.title,
                contents: data.contents
            });
            const saveSecondPartEpiogue = yield secondPartEpilogue.save();
            yield tableContents.secondPartTableContents.unshift(saveSecondPartEpiogue);
            if (isAlreadySecondPartTableContents.length < 1) {
                const season = ["봄", "여름", "가을", "겨울"];
                for (let i = 0; i < 4; i++) {
                    let chapter = 1;
                    const dummySecondPartTableContents = new SecondPartTableContent_1.default({
                        chapter,
                        title: `${user.book.author}의 ${season[i]}`
                    });
                    const saveSecondPartEpiogue = yield dummySecondPartTableContents.save();
                    yield tableContents.secondPartTableContents.push(saveSecondPartEpiogue);
                    chapter = chapter + 1;
                }
            }
            yield tableContents.save();
            return user;
        }
        catch (err) {
            throw err;
        }
    }),
    getTheBestMomentSub: (petId, theBestMoment) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const pet = yield Pet_1.default.findById(petId);
            return new TheBestMomentSubResDto_1.TheBestMomentSubResDto(pet, theBestMoment);
        }
        catch (err) {
            throw err;
        }
    })
};
//# sourceMappingURL=rainbowService.js.map