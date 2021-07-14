import { IUserDiary, IUserDiaryDocument } from "../../interfaces/diary/IUserDiary";
import { IPet } from "../../interfaces/pet/IPet";
import UserDiary from "../../models/diary/UserDiary";
require("../../models/user/User")
require("../../models/book/Book")
require("../../models/pet/Pet")
require('../../models/tableContents/TableContents')
require('../../models/tableContents/SecondPartTableContent')
const dateMethod = require('../../modules/dateMethod')

export class SecondPartDiaryResDto {
    public secondPartDiary = {
        _id: null,
        episode: null,
        title: null,
        diaryImg: [],
        date: null,
        contents: null,
        feelingList: []
    }

    constructor(userDiary: IUserDiary) {
        this.init(userDiary)
    }
    async init(userDiary: IUserDiary) {
        this.secondPartDiary._id = userDiary._id
        this.secondPartDiary.title = userDiary.title
        this.secondPartDiary.diaryImg = userDiary.imgs
        this.secondPartDiary.date = await dateMethod.toKoreanByFormatting(userDiary.date)
        this.secondPartDiary.episode = userDiary.episode
        this.secondPartDiary.contents = userDiary.contents
        this.secondPartDiary.feelingList[0]={
            kind:0,
            petImgs:null,
            feeling:userDiary.feeling
        }
    }
}
export { }