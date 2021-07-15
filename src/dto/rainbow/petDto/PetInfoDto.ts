import { IPet } from "../../../interfaces/pet/IPet"

export class PetsInfoDto{
    private pets = []
    
    constructor(petInfo : PetInfoDto[]){
        this.pets = petInfo
    }
}

export class PetInfoDto{
   private _id = null
   private img = ""
   private name = ""
   private kind  = null

   constructor(pet : IPet){
       this._id = pet._id
       this.img = pet.imgs as string
       this.name = pet.name as string
       this.kind = pet.kind
   }
}