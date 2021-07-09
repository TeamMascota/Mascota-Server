import { IPetDiary, IPetDiaryDocument } from "../../interfaces/diary/IPetDiary";
import PetDiary from "../../models/diary/PetDiary"
import PetEmotions from "../../models/diary/PetEmotions"
require("../../models/user/User")
require("../../models/book/Book")
require("../../models/pet/Pet")
require('../../models/tableContents/TableContents')
require('../../models/tableContents/FirstPartTableContents')
const dateMethod = require('../../modules/dateMethod')

export class PetChapterDiaryResDto{
    public petChapterDiary = {
        chapterId:null,
        chapter:null,
        chapterTitle:null,
        episodePerMonthCount:null,
        monthly:[]
        }
    
    constructor(petDiary : IPetDiary){
        
    }
  
}
export class MonthlyDiaryResDto{
    public monthlyDiary={
        episodePerMonthCount:null,
        month:null,
        diaries:[]
    }
    constructor(){

    }
}
export class DiariesResDto{
    public DiariesRes={
        diaryId:null,
        title:null,
        contents:null,
        episode:null,
        image:null,
        feelingCount:null,
        feeling:null,
        date:null,
        weekday:null
    }
    constructor(){

    }
}
export{}