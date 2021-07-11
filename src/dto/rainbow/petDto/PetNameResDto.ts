import { IPet } from "../../../interfaces/pet/IPet";

export class PetNameResDto{
    name

    constructor(pet : IPet){
        this.name = pet.name
    }
}