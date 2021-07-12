import { inherits } from "util"
import { IPet } from "../../../interfaces/pet/IPet"
import { TheBestMomentsResDto } from "./TheBestMomentResDto"
const dateMethod  = require("../../../modules/dateMethod")

export class TheBestMomentSubResDto{
    private rainbowComment
    private rainbowBestMoment

    constructor(pet: IPet, theBestMoment : TheBestMomentsResDto){
        this.init(pet, theBestMoment)
    }

    async init(pet: IPet, theBestMoment : TheBestMomentsResDto){
        this.rainbowComment = `작가님과 함께했던 ${await dateMethod.getElapsedDay(pet.startDate)}일의 시간동안\n${pet.name}는 의젓하고 당당한 ${pet.name}으로써\n행복한 인생을 보낼 수 있었어요.\n이젠 ${pet.name}가 느꼇던 최고의 순간들을\n모아봤어요!`
        this.rainbowBestMoment = theBestMoment
    }
}