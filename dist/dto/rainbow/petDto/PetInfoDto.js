"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetInfoDto = exports.PetsInfoDto = void 0;
class PetsInfoDto {
    constructor(petInfo) {
        this.pets = [];
        this.pets = petInfo;
    }
}
exports.PetsInfoDto = PetsInfoDto;
class PetInfoDto {
    constructor(pet) {
        this._id = null;
        this.img = "";
        this.name = "";
        this.kind = null;
        this._id = pet._id;
        this.img = pet.imgs;
        this.name = pet.name;
        this.kind = pet.kind;
    }
}
exports.PetInfoDto = PetInfoDto;
//# sourceMappingURL=PetInfoDto.js.map