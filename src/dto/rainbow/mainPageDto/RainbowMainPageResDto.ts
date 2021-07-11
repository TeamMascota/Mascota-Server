import { IPetDiary } from "../../../interfaces/diary/IPetDiary";
import { IHelp } from "../../../interfaces/etc/IHelp";
import { IPet } from "../../../interfaces/pet/IPet";
import { IBook } from "../../../interfaces/book/IBook";

export class RainbowMainPageResDto{
    public rainbowMainPage = {
        title : null,
        bookImg : null,
        rainbowCheck : false,
        memories : [],
        help : []
    }

    constructor(book : IBook,isRainbowPet : boolean,rainbowButtonCheck : boolean){
        this.rainbowMainPage.title = isRainbowPet ? "우리들의 무지개" : "무지개 준비하기"//작가와 무지개다리를 건넌 동물의 이름 합친거
        this.rainbowMainPage.bookImg = book.imgs 
        this.rainbowMainPage.rainbowCheck = rainbowButtonCheck
    }

    setMemories(memories : MemoriesResDto[]){
        this.rainbowMainPage.memories = memories
    }
    setHelp(helps : HelpResDto[]){
        this.rainbowMainPage.help = helps
    }
}

export class MemoriesResDto{
    private title;
    private contents;
    private date;
    private feeling;

    constructor(petDiaries : IPetDiary[], petId : IPet){
        const diaryIndex = this.getRandomMemoryIndex(petDiaries.length)
        const randomDiary = petDiaries[diaryIndex]
        console.log("랜덤된 petEmotion "+randomDiary.petEmotions.filter(petEmotion =>
            petEmotion.pet == petId)[0])

        this.title = randomDiary.title
        this.contents = randomDiary.contents
        this.date = randomDiary.date
        this.feeling = randomDiary.petEmotions.filter(petEmotion =>
            petEmotion.pet == petId)[0].feeling
    }

    getRandomMemoryIndex(max : number){
        let min = Math.ceil(0);
        max = Math.floor(max);
        return Math.floor(Math.random()*(max-min))+min;
    }
}

export class HelpResDto{
    private classification;
    private title;
    private url;

    constructor(help : IHelp){
        this.classification = help.classification;
        this.title = help.title;
        this.url = help.url; 
    }
}