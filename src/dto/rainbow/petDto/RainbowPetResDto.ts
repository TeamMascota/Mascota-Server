import {IPet} from "../../../interfaces/pet/IPet"

export class RainbowPetResDto{
    public pet = []

    constructor(myPetInfoResDto : MyPetInfoResDto[]){
        this.pet = myPetInfoResDto
    }
}

export class MyPetInfoResDto{
    public _id
    public name
    public img

    constructor(pet : IPet){
        this._id = pet._id
        this.name = pet.name
        this.img = pet.imgs
    }
}