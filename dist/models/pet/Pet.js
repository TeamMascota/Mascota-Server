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
const PetSchema = new mongoose_1.default.Schema({
    name: { type: String },
    kind: { type: Number },
    gender: { type: Number },
    imgs: {
        type: String
    },
    user: {
        type: mongoose_1.default.SchemaTypes.ObjectId, ref: "User"
    },
    book: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: "Book:"
    },
    rainbow: {
        type: Boolean,
        default: false
    },
    startDate: {
        type: Date,
        default: Date.now()
    }
});
PetSchema.methods.setUser = function (user) {
    return __awaiter(this, void 0, void 0, function* () {
        this.user = user;
    });
};
PetSchema.methods.setBook = function (book) {
    return __awaiter(this, void 0, void 0, function* () {
        this.book = book;
    });
};
exports.default = mongoose_1.default.model("Pet", PetSchema, "pets");
//# sourceMappingURL=Pet.js.map