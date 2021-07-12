"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarDateUserDto = exports.CalendarDatePetDto = exports.CalendarInfoResDto = exports.CalendarResDto = void 0;
const IPet = require("../../interfaces/pet/IPet");
class CalendarResDto {
    constructor(name, part) {
        this.name = null;
        this.part = null;
        this.nextEpilogue = null;
        this.calendar = null;
        this.name = name;
        this.part = part;
    }
    setCalendar(calendar) {
        this.calendar = calendar;
    }
}
exports.CalendarResDto = CalendarResDto;
class CalendarInfoResDto {
    constructor(year, month) {
        this.year = null;
        this.month = null;
        this.date = [];
        this.year = year;
        this.month = month;
    }
    setDate(calendarDateDto) {
        this.date.push(calendarDateDto);
    }
}
exports.CalendarInfoResDto = CalendarInfoResDto;
class CalendarDatePetDto {
    constructor(days, petDiaries) {
        this.days = null;
        this.kind = null;
        this.id = [];
        this.feeling = null;
        this.days = days;
        this.kind = petDiaries[0].pets[0].kind;
        this.id = petDiaries.map(diary => diary._id);
        this.feeling = petDiaries[0].petEmotions[0].feeling;
    }
}
exports.CalendarDatePetDto = CalendarDatePetDto;
class CalendarDateUserDto {
    constructor(days, userDiaries, user) {
        this.days = null;
        this.kind = null;
        this.diaryId = [];
        this.feeling = null;
        this.days = days;
        this.kind = this.getUsersPet(user);
        this.diaryId = userDiaries.map(diary => diary._id);
        this.feeling = userDiaries[0].feeling;
    }
    getUsersPet(user) {
        const pets = user.pets;
        let petsKind = null;
        for (let i = pets.length - 1; i >= 0; i--) {
            if (pets[i].rainbow)
                petsKind = pets[i].kind;
        }
        return petsKind;
    }
}
exports.CalendarDateUserDto = CalendarDateUserDto;
//# sourceMappingURL=calendarResDto.js.map