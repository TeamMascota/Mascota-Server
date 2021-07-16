import { IPet } from "../../../interfaces/pet/IPet"

export class PartingRainbowResDto{
    public partingRainbowBridge = {
        contents : "",
        diaryCount : 0,
    }

    constructor(diaryCount : number, pet : IPet){
        let petName = pet.kind == 1 ? "고양이" : "강아지"
        this.partingRainbowBridge.contents =`작가님과 함께했던 ${diaryCount}화의 이야기 속에서 \n${pet.name}이는(은) 의젓하고 당당한 ${petName}로서 \n행복한 인생을 보낼 수 있었어요. \n그리고 지금은 작가님보다 한 발 앞서서 \n먼저 무지개 다리로 가 친구들과 함께 \n작가님을 기다리기로 했습니다. \n\n그동안 행복한 일상을 선물해주셔서 감사합니다. \n${pet.name}이가 느꼈던 최고의 순간들을 모아봤어요.`,
        this.partingRainbowBridge.diaryCount = diaryCount 
    }
}