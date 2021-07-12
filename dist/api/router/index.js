"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.use('/user', require('./user')); //user
router.use('/pet', require('./pet')); //pet
router.use('/chapter', require('./chapter')); //1부 목차
router.use('/diary', require('./diary')); //1부 일기
router.use('/rainbow', require('./rainbow')); //무지개\
router.use('/calendar', require('./calendar')); //캘린더
router.use('/firstPart', require('./firstPart')); //1부
router.use('/secondPart', require('./secondPart')); //2부
module.exports = router;
//# sourceMappingURL=index.js.map