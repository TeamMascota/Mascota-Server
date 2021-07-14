"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const HelpSchema = new mongoose_1.default.Schema({
    classification: { type: String },
    title: { type: String },
    url: { type: String }
});
exports.default = mongoose_1.default.model("Help", HelpSchema, "helps");
//# sourceMappingURL=Help.js.map