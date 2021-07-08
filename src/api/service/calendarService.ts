import FirstPartTableContents from "../../models/tableContents/FirstPartTableContents"
import SecondPartTableContent from "../../models/tableContents/SecondPartTableContent"
import PetDiary from "../../models/diary/PetDiary"
import UserDiary from "../../models/diary/UserDiary"
import { CalendarDateUserDto, CalendarDatePetDto, CalendarInfoResDto, CalendarResDto } from "../../dto/calendar/calendarResDto"
import User from "../../models/user/User"
import Book from "../../models/book/Book"
const dateMethod = require("../../modules/dateMethod")

require('../../models/tableContents/FirstPartTableContents')
require('../../models/tableContents/SecondPartTableContent')
require('../../models/diary/PetDiary')
require('../../models/diary/UserDiary')
require('../../models/diary/PetEmotions')
require('../../models/book/Book')

module.exports = {
    getDiaryPerDate: async (year, month, part) => {
        try {
            const user = (await User.find().populate({path : "book"}))[0]
            const author = user.book.author
            const calendarResDto = new CalendarResDto(author, part)
            if(part == 1){
                const calendarDiary = await PetDiary.find({
                    date:{
                        $gte : new Date(year, month-1, 1),
                        $lt : new Date(year, month, 1)
                    }
                }).populate({
                    path : "petEmotions pets",
                })
                console.log('calendarDiary : '+calendarDiary)
                const thisMonthLength = await dateMethod.getLastDateOfMonth(year,month)

                const calendarInfoResDto = new CalendarInfoResDto(year,month)
                for(let i = 0;i<thisMonthLength;i++){
                    const diariesPerMonth = calendarDiary.filter(diary => diary.date.getDate() == i)
                    if(diariesPerMonth.length < 1){
                        calendarInfoResDto.setDate(null)
                    }else{
                        calendarInfoResDto.setDate(new CalendarDatePetDto(i+1,diariesPerMonth))
                    }
                    //CalendarDiary에 각 일에 해당하는 일기를 만들어서 넣어주면된다
                }
                calendarResDto.setCalendar(calendarInfoResDto)
            }else if(part == 2){
                const calendarDiary = await UserDiary.find({
                    date:{
                        $gte : new Date(year, month-1, 1),
                        $lt : new Date(year, month, 1)
                    }
                }).populate({
                    path : "petEmotions pets"
                })
                console.log('calendarDiary : '+calendarDiary)
                const thisMonthLength = await dateMethod.getLastDateOfMonth(year,month)

                const calendarInfoResDto = new CalendarInfoResDto(year,month)
                for(let i = 0;i<thisMonthLength;i++){
                    const diariesPerMonth = calendarDiary.filter(diary => diary.date.getDate() == i)
                    if(diariesPerMonth.length < 1){
                        calendarInfoResDto.setDate(null)
                    }else{
                        calendarInfoResDto.setDate(new CalendarDateUserDto(i+1,diariesPerMonth,user))
                    }
                    //CalendarDiary에 각 일에 해당하는 일기를 만들어서 넣어주면된다
                }
                calendarResDto.setCalendar(calendarInfoResDto)
            }
            return calendarResDto
        } catch (err) {
            throw err
        }
    },

    getYearDiary: async (year, month, part) => {
        
    }
}