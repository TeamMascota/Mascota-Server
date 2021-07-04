import { IPetDiary } from "../../../interfaces/diary/IPetDiary";
import { IHelp } from "../../../interfaces/etc/IHelp";
import { IPet } from "../../../interfaces/pet/IPet";
import { IUser } from "../../../interfaces/user/IUser";

interface IRainbowMainPageResDto{
    title : String,
    bookImg : String,
    memories : [MemoriesResDto],
    help : [HelpResDto]
}

export default class RainbowMainPageResDto{
    public rainbowMainPage : IRainbowMainPageResDto;

    constructor(user : IUser){
        this.rainbowMainPage.title //작가와 무지개다리를 건넌 동물의 이름 합친거
        this.rainbowMainPage.bookImg = user.book.imgs   //책 이미지에서 맨앞에?
    }

    setMemories(memories : MemoriesResDto){
        this.rainbowMainPage.memories.push(memories)
    }
    setHelp(helps : [HelpResDto]){
        this.rainbowMainPage.help = helps
    }
}

export class MemoriesResDto{
    private title;
    private contents;
    private date;
    private feel;

    constructor(petDiary : IPetDiary, pet : IPet){
        this.title = petDiary.title;
        this.contents = petDiary.contents;
        this.date = petDiary.date;
        this.feel = petDiary.petEmotions.filter(petEmotion => 
            petEmotion.pet == pet)
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