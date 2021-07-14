import { IPetDiary, IPetDiaryDocument } from "../../interfaces/diary/IPetDiary";
import { IPetEmotions } from "../../interfaces/diary/IPetEmotions";
import { IFirstPartTableContents } from "../../interfaces/tableContents/IFirstPartTableContents";
import PetDiary from "../../models/diary/PetDiary"
import PetEmotions from "../../models/diary/PetEmotions"
require("../../models/user/User")
require("../../models/book/Book")
require("../../models/pet/Pet")
require('../../models/tableContents/TableContents')
require('../../models/tableContents/FirstPartTableContents')
const dateMethod = require('../../modules/dateMethod')

export class ChapterListResDto{
    public tableContents = [ ]        
    setChapterList(chapter:ChapterResDto){
        this.tableContents.push(chapter)
    }
}
export class ChapterResDto{
        public chapterId=null
        public chapter=null
        public chapterTitle=null
        public episodePerchapterCount=null


    constructor(firstPartTableContents:IFirstPartTableContents){
        this.chapterId=firstPartTableContents._id
        this.chapter=firstPartTableContents.chapter
        this.chapterTitle=firstPartTableContents.title
        this.episodePerchapterCount
    }
} 

export{}