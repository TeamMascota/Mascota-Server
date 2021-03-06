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
const Comments_1 = __importDefault(require("../../models/etc/Comments"));
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
                                path: "petEmotions",
                                populate: {
                                    path: "pet"
                                }
                            }
                        }
                    }
                }
            });
            const findPet = yield Pet_1.default.findById(petId);
            const isRainbowPet = yield isRainbow(findUser.pets);
            const rainbowButtonCheck = yield rainbowCheck(findUser.pets);
            const rainbowMainPageResDto = new RainbowMainPageResDto_1.RainbowMainPageResDto(findUser.book, isRainbowPet, rainbowButtonCheck);
            const firstPartTableContents = findUser.book.tableContents.firstPartTableContents;
            console.log('firstPartTableContents : ' + firstPartTableContents);
            const validMemories = firstPartTableContents.filter(tableContents => tableContents.petDiary.length > 0).map(tableContents => tableContents.petDiary.filter(petDiary => petDiary.pets.includes(petId)))[0];
            console.log('validMemories : ' + validMemories);
            console.log('!!!!!!!!!!!!!!!!!!!!! : ' + validMemories[0]);
            console.log('@@@@@@@@@@@@@@@@@@ : ' + validMemories[1]);
            //validMemories : [tableContetns [petDiary]]
            let memoriesResDto = [null, null];
            console.log('validMemoriesLength : ' + validMemories.length);
            if (validMemories.length == 2) {
                memoriesResDto[0] = new RainbowMainPageResDto_1.MemoriesResDto(validMemories, findPet);
                memoriesResDto[1] = new RainbowMainPageResDto_1.MemoriesResDto(validMemories, findPet);
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
                console.log('firstTableContentsIndex : ' + firstTableContentsIndex);
                console.log('secondTableCOntetnsIndex : ' + secondTableContentsIndex);
                console.log('fisrt : ' + validMemories[firstTableContentsIndex]);
                console.log('second : ' + validMemories[secondTableContentsIndex]);
                memoriesResDto[0] = new RainbowMainPageResDto_1.MemoriesResDto2(validMemories[firstTableContentsIndex], findPet);
                memoriesResDto[1] = new RainbowMainPageResDto_1.MemoriesResDto2(validMemories[secondTableContentsIndex], findPet);
            }
            else if (validMemories.length == 1) {
                memoriesResDto[0] = new RainbowMainPageResDto_1.MemoriesResDto2(validMemories[0], findPet);
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
            const timeTogether = (yield User_1.default.findById(userId).populate('book')).book.date;
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
            const theBestMomentsResDto = new TheBestMomentResDto_1.TheBestMomentsResDto(timeTogether);
            for (let j = 0; j < 6; j++) { //??????3???, ??????3???
                const commentPerFeeling = yield Comments_1.default.findOne({ feeling: j, classification: 1 });
                // let commentPerFeeling ={
                //     comments : "",
                //     feeling : j
                // }
                // if(j==0){
                //     commentPerFeeling.comments = await theBestMomentComments.loveFeeling(pet.name)
                // }else if(j==1){
                //     commentPerFeeling = await theBestMomentComments.happyFeeling(pet.name)
                // }else if(j==2){
                //     commentPerFeeling = await theBestMomentComments.normalFeeling()
                // }else if(j==3){
                //     commentPerFeeling = await theBestMomentComments.angryFeeling(pet.name)
                // }else if(j==4){
                //     commentPerFeeling = await theBestMomentComments.gloomyFeeling()
                // }else if(j==5){
                //     commentPerFeeling = await theBestMomentComments.boringFeeling()
                // }
                let theBestMoment = null;
                if (j < 3) {
                    theBestMoment = new TheBestMomentResDto_1.TheBestMoment(commentPerFeeling, getPositiveRadomDiary(diaryPerFeeling[j]));
                }
                else {
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
        //??? ????????? ?????? ???????????? ????????? ????????? ???????????????
        function getPositiveRadomDiary(diaries) {
            if (diaries === null)
                return null;
            const diaryLength = diaries.length;
            const theBestMomentDiaries = [];
            if (diaryLength < 8) {
                for (let i = 0; i < diaryLength; i++) { //????????? ?????? ?????? ??????????????? ?????????
                    theBestMomentDiaries.push(new TheBestMomentResDto_1.TheBestMomentDiary(diaries[i]));
                }
                for (let j = 0; j < 8 - diaryLength; j++) { //?????? ????????????(8-????????? ?????? ?????????)?????? null??? ????????????
                    theBestMomentDiaries.push(null);
                }
            }
            else {
                //8??? ????????? ????????? 8?????? ????????? ????????????.
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
        //?????? ????????? 2?????????
        function getNegativeRandomDiary(diaries) {
            if (diaries === null)
                return null;
            const diaryLength = diaries.length;
            const theBestMomentDiaries = [];
            console.log('?????? ?????? ?????? : ' + diaryLength);
            console.log('?????? diary!!!! : ' + diaries);
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
                    console.log('index!!!! : ' + index);
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
            //1??? ?????? ???????????? ????????????
            const firstPartEpilogue = new FirstPartTableContents_1.default({
                chapter: -1,
                title: data.title,
                contents: data.contents
            });
            yield firstPartEpilogue.save();
            yield tableContents.firstPartTableContents.push(firstPartEpilogue);
            const isAlreadySecondPartTableContents = yield SecondPartTableContent_1.default.find(); //??? ??????????????? ???????????? ???????????? ???????????? ?????? ??????
            //2??? ?????? ????????? ????????????
            const secondPartEpilogue = new SecondPartTableContent_1.default({
                chapter: 0,
                title: data.title,
                contents: data.contents
            });
            const saveSecondPartEpiogue = yield secondPartEpilogue.save();
            yield tableContents.secondPartTableContents.unshift(saveSecondPartEpiogue);
            if (isAlreadySecondPartTableContents.length < 1) {
                const season = ["???", "??????", "??????", "??????"];
                for (let i = 0; i < 4; i++) {
                    let chapter = 1;
                    const dummySecondPartTableContents = new SecondPartTableContent_1.default({
                        chapter,
                        title: `${user.book.author}??? ${season[i]}`
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