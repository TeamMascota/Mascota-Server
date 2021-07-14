"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const InstitutionSchema = new mongoose_1.default.Schema({
    feeling: { type: Number },
    type: { type: Number },
    contents: { type: String },
    url: { type: String }
});
exports.default = mongoose_1.default.model("Institutions", InstitutionSchema, "institutions");
//# sourceMappingURL=Institution.js.map