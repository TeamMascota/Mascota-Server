"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SecondPartTableContentsSchema = new mongoose_1.default.Schema({
    chapter: {
        type: Number,
        default: 0
    },
    title: {
        type: String,
        default: null
    },
    contents: {
        type: String,
        default: null
    },
    userDiary: [
        {
            type: mongoose_1.default.SchemaTypes.ObjectId,
            ref: "UserDiary",
            default: []
        }
    ]
});
SecondPartTableContentsSchema.methods.setUserDiary = function (userDiary) {
    return __awaiter(this, void 0, void 0, function* () {
        this.userDiary.push(userDiary);
    });
};
exports.default = mongoose_1.default.model("SecondPartTableContents", SecondPartTableContentsSchema, "secondPartTableContents");
//# sourceMappingURL=SecondPartTableContent.js.map