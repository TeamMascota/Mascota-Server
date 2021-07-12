"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const firstPartController = require('../../controller/FirstPartController');
//1부 메인페이지 불러오기
router.get('/main/:userId', firstPartController.mainPage);
module.exports = router;
//# sourceMappingURL=index.js.map