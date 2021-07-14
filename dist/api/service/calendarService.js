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
const PetDiary_1 = __importDefault(require("../../models/diary/PetDiary"));
const UserDiary_1 = __importDefault(require("../../models/diary/UserDiary"));
const calendarResDto_1 = require("../../dto/calendar/calendarResDto");
const User_1 = __importDefault(require("../../models/user/User"));
const dateMethod = require("../../modules/dateMethod");
require('../../models/tableContents/FirstPartTableContents');
require('../../models/tableContents/SecondPartTableContent');
require('../../models/diary/PetDiary');
require('../../models/diary/UserDiary');
require('../../models/diary/PetEmotions');
require('../../models/book/Book');
module.exports = {
    getDiaryPerDate: (year, month, part) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = (yield User_1.default.find().populate({ path: "book" }))[0];
            const author = user.book.author;
            const calendarResDto = new calendarResDto_1.CalendarResDto(author, part);
            if (part == 1) {
                const calendarDiary = yield PetDiary_1.default.find({
                    date: {
                        $gte: new Date(year, month - 1, 1),
                        $lt: new Date(year, month, 1)
                    }
                }).populate({
                    path: "petEmotions pets",
                });
                console.log('calendarDiary : ' + calendarDiary);
                const thisMonthLength = yield dateMethod.getLastDateOfMonth(year, month);
                const calendarInfoResDto = new calendarResDto_1.CalendarInfoResDto(year, month);
                for (let i = 0; i < thisMonthLength; i++) {
                    const diariesPerMonth = calendarDiary.filter(diary => diary.date.getDate() == i);
                    if (diariesPerMonth.length < 1) {
                        calendarInfoResDto.setDate(null);
                    }
                    else {
                        calendarInfoResDto.setDate(new calendarResDto_1.CalendarDatePetDto(i + 1, diariesPerMonth));
                    }
                    //CalendarDiary에 각 일에 해당하는 일기를 만들어서 넣어주면된다
                }
                calendarResDto.setCalendar(calendarInfoResDto);
            }
            else if (part == 2) {
                const calendarDiary = yield UserDiary_1.default.find({
                    date: {
                        $gte: new Date(year, month - 1, 1),
                        $lt: new Date(year, month, 1)
                    }
                }).populate({
                    path: "petEmotions pets"
                });
                console.log('calendarDiary : ' + calendarDiary);
                const thisMonthLength = yield dateMethod.getLastDateOfMonth(year, month);
                const calendarInfoResDto = new calendarResDto_1.CalendarInfoResDto(year, month);
                for (let i = 0; i < thisMonthLength; i++) {
                    const diariesPerMonth = calendarDiary.filter(diary => diary.date.getDate() == i);
                    if (diariesPerMonth.length < 1) {
                        calendarInfoResDto.setDate(null);
                    }
                    else {
                        calendarInfoResDto.setDate(new calendarResDto_1.CalendarDateUserDto(i + 1, diariesPerMonth, user));
                    }
                    //CalendarDiary에 각 일에 해당하는 일기를 만들어서 넣어주면된다
                }
                calendarResDto.setCalendar(calendarInfoResDto);
            }
            return calendarResDto;
        }
        catch (err) {
            throw err;
        }
    }),
};
//# sourceMappingURL=calendarService.js.map