"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyPetInfoResDto = exports.RainbowPetResDto = void 0;
class RainbowPetResDto {
    constructor(myPetInfoResDto) {
        this.pet = [];
        this.pet = myPetInfoResDto;
    }
}
exports.RainbowPetResDto = RainbowPetResDto;
class MyPetInfoResDto {
    constructor(pet) {
        this._id = pet._id;
        this.name = pet.name;
        this.img = pet.imgs;
    }
}
exports.MyPetInfoResDto = MyPetInfoResDto;
//# sourceMappingURL=RainbowPetResDto.js.map