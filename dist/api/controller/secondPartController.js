var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var util = require('../../modules/util');
var responseMessage = require('../../modules/responseMessage');
var statusCode = require('../../modules/statusCode');
const secondPartService = require('../service/secondPartService');
module.exports = {
    getMainPage: (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.params;
        try {
            const result = yield secondPartService.getMainPage(userId);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_SECOND_PART_MAIN_PAGE, result));
        }
        catch (err) {
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
        }
    }),
    getDiaryOfTableContents: (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { tableContentsId } = req.params;
        try {
            const result = yield secondPartService.getDiaryOfTableContents(tableContentsId);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_SECOND_PART_DIARY_OF_TABLECONTENTS, result));
        }
        catch (err) {
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
        }
    }),
    getSecondPartChapterList: (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield secondPartService.getSecondPartChapterList();
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_SECOND_PART_CHAPTER_LIST, result));
        }
        catch (err) {
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
        }
    }),
    addSecondPartChapter: (req, res) => __awaiter(this, void 0, void 0, function* () {
        const chapterData = req.body;
        try {
            yield secondPartService.addSecondPartChapter(chapterData);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_POST_SECOND_PART_ADD_CHAPTER));
        }
        catch (err) {
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
        }
    }),
    modifySecondPartChapterInfo: (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { chapterId } = req.params;
        const modifyChapterData = req.body;
        try {
            yield secondPartService.modifySecondPartChapterInfo(chapterId, modifyChapterData);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_PUT_SECOND_PART_MODIFY_CHAPTER));
        }
        catch (err) {
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
        }
    }),
    deleteSecondPartChapter: (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { chapterId } = req.params;
        try {
            yield secondPartService.deleteSecondPartChapter(chapterId);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_DELETE_SECOND_PART_DELETE_CHAPTER));
        }
        catch (err) {
            console.error(err);
            if (err.statusCode === 400) {
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.FAIL_TO_GET_SECOND_PART_TABLE_CONTENTS));
            }
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
        }
    })
};
//# sourceMappingURL=secondPartController.js.map