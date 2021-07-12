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
Object.defineProperty(exports, "__esModule", { value: true });
const util = require('../../modules/util');
const responseMessage = require('../../modules/responseMessage');
const statusCode = require('../../modules/statusCode');
const chapterService = require('../service/chapterService');
module.exports = {
    getChapterDiary: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const chapterId = req.params.id; //id를 뺴면 객체를 보내줌
        try {
            const result = yield chapterService.getChapterDiary(chapterId);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_CHAPTER_PETDIARY, result));
        }
        catch (err) {
            console.error(err);
            if (err.statusCode == null) {
                err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
                err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
            }
            return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage));
        }
    }),
    getChapterList: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.params.id;
        try {
            const result = yield chapterService.getChapterList(userId);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_CHAPTERLIST, result));
        }
        catch (err) {
            console.error(err);
            if (err.statusCode == null) {
                err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
                err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
            }
            return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage));
        }
    }),
    postChapterList: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.params.id;
        const chapterTitle = req.body.chapterTitle;
        try {
            const result = yield chapterService.postChapterList(userId, chapterTitle);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_POST_CHAPTERLIST, result));
        }
        catch (err) {
            console.error(err);
            if (err.statusCode == null) {
                err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
                err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
            }
            return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage));
        }
    }),
    putChapterList: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const chapterId = req.params.id;
        const chapterTitle = req.body.chapterTitle;
        try {
            const result = yield chapterService.putChapterList(chapterId, chapterTitle);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_EDIT_CHAPTERLIST, result));
        }
        catch (err) {
            console.error(err);
            if (err.statusCode == null) {
                err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
                err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
            }
            return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage));
        }
    }),
    deleteChapterList: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const chapterId = req.params.id;
        try {
            const result = yield chapterService.deleteChapterList(chapterId);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_DELETE_CHAPTERLIST, result));
        }
        catch (err) {
            console.error(err);
            if (err.statusCode == null) {
                err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
                err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
            }
            return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage));
        }
    })
};
//# sourceMappingURL=chapterController.js.map