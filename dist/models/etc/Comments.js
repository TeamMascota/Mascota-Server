"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CommentsSchema = new mongoose_1.default.Schema({
    feeling: { type: Number },
    comments: { type: String },
    classification: { type: Number }
});
exports.default = mongoose_1.default.model("Comments", CommentsSchema, "comments");
//# sourceMappingURL=Comments.js.map