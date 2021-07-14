import { ISecondPartTableContents } from "../../interfaces/tableContents/ISecondPartTableContents"

export class SecondPartChapterListResDto{
    private tableContents : SecondPartChapterList[] = []

    constructor(secondPartChapterList : ISecondPartTableContents[]){
        this.tableContents = secondPartChapterList.map(chapter=>
            new SecondPartChapterList(chapter))
    }
}

export class SecondPartChapterList{
    private _id = null
    private chapter = null
    private title = null

    constructor(chapter : ISecondPartTableContents){
        this._id = chapter._id
        this.chapter = chapter.chapter
        this.title = chapter.title
    }
}