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
const FirstPartMainPageResDto_1 = require("../../dto/firstPart/mainPageDto/FirstPartMainPageResDto");
const dateMethod = require("../../modules/dateMethod");
const util = require('../../modules/util');
const responseMessage = require('../../modules/responseMessage');
const statusCode = require('../../modules/statusCode');
const Book_1 = __importDefault(require("../../models/book/Book"));
const TableContents_1 = __importDefault(require("../../models/tableContents/TableContents"));
const FirstPartTableContents_1 = __importDefault(require("../../models/tableContents/FirstPartTableContents"));
require("../../models/user/User");
require("../../models/pet/Pet");
require("../../models/book/Book");
require('../../models/tableContents/TableContents');
require('../../models/tableContents/FirstPartTableContents');
require('../../models/diary/PetDiary');
require('../../models/diary/PetEmotions');
require('../../models/diary/UserDiary');
module.exports = {
    getMainPage: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //find userData
            const findUser = yield User_1.default.findById(userId).populate({
                path: "pets"
            }).populate({
                path: "book",
                populate: ({
                    path: "tableContents",
                    populate: ({
                        path: "firstPartTableContents",
                        populate: ({
                            path: "petDiary",
                            populate: {
                                path: "petEmotions"
                            }
                        })
                    })
                })
            });
            let newBook = new Book_1.default();
            let newTableContents = new TableContents_1.default();
            let newFirstPartTableContents = new FirstPartTableContents_1.default();
            newTableContents.setFirstPartTableContents(newFirstPartTableContents);
            newBook.setTableContents(newTableContents);
            if (findUser.book == null) {
                findUser.setBook(newBook);
            }
            if (findUser.book.tableContents == null) {
                findUser.book.tableContents = new TableContents_1.default();
            }
            if (findUser.book.tableContents.firstPartTableContents == null) {
                findUser.book.tableContents.firstPartTableContents.push(new FirstPartTableContents_1.default());
            }
            const firstPartMainPageResDto = new FirstPartMainPageResDto_1.FirstPartMainPageResDto(findUser.book);
            let lastTableNumber = findUser.book.tableContents.firstPartTableContents.length - 1;
            console.log('11111 : ' + lastTableNumber);
            //console.log("#:",lastTableNumber)
            const lastDiary = new FirstPartMainPageResDto_1.DiaryResDto(findUser.book.tableContents.firstPartTableContents[lastTableNumber]);
            //tableContents
            for (let i = 0; i < lastTableNumber; i++) {
                let tableContentsResDto = new FirstPartMainPageResDto_1.TableContentsResDto(findUser.book.tableContents.firstPartTableContents[i]);
                firstPartMainPageResDto.setTableContents(tableContentsResDto);
            }
            firstPartMainPageResDto.setDiary(lastDiary);
            if (findUser.book.tableContents.secondPartTableContents.length > 1) {
                firstPartMainPageResDto.setSecondPartBook(findUser);
            }
            return firstPartMainPageResDto;
        }
        catch (err) {
            console.log(err);
            throw { statusCode: statusCode.BAD_REQUEST, responseMessage: responseMessage.NO_USER };
        }
    })
};
//# sourceMappingURL=firstPartService.js.map