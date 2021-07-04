import { IPetDiary } from "../../../interfaces/diary/IPetDiary";
import { IHelp } from "../../../interfaces/etc/IHelp";
import { IPet } from "../../../interfaces/pet/IPet";
import { IFirstPartTableContents } from "../../../interfaces/tableContents/IFirstPartTableContents";
import { IUser } from "../../../interfaces/user/IUser";

interface IRainbowMainPageResDto{
    title : String,
    bookImg : String,
    memories : [MemoriesResDto],
    help : [HelpResDto]
}

export class RainbowMainPageResDto{
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

    constructor(firstPartTableContents : IFirstPartTableContents[], pet : IPet){
        
    }

    randomMemory(firstPartTableContents : IFirstPartTableContents[]){
        const tableContentsLenght = firstPartTableContents.length
        const min = Math.ceil(0)
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