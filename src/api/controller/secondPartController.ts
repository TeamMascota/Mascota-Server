import { Result } from "express-validator"

var util = require('../../modules/util')
var responseMessage = require('../../modules/responseMessage')
var statusCode = require('../../modules/statusCode')
const secondPartService = require('../service/secondPartService')

module.exports = {
    getMainPage: async (req, res) => {
        const { userId } = req.params
        try {
            const result = await secondPartService.getMainPage(userId)
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_SECOND_PART_MAIN_PAGE, result))
        } catch (err) {
            console.error(err)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR))
        }
    },

    getDiaryOfTableContents: async (req, res) => {
        const { tableContentsId } = req.params
        try {
            const result = await secondPartService.getDiaryOfTableContents(tableContentsId)
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_SECOND_PART_DIARY_OF_TABLECONTENTS, result))
        } catch (err) {
            console.error(err)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR))
        }
    },

    getSecondPartChapterList: async (req, res) => {
        try {
            const result = await secondPartService.getSecondPartChapterList()
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_SECOND_PART_CHAPTER_LIST, result))
        } catch (err) {
            console.error(err)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR))
        }
    },

    addSecondPartChapter: async (req, res) => {
        const chapterData = req.body
        try {
            const result =await secondPartService.addSecondPartChapter(chapterData)
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_POST_SECOND_PART_ADD_CHAPTER,result))
        } catch (err) {
            console.error(err)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR))
        }
    },

    modifySecondPartChapterInfo: async (req, res) => {
        const { chapterId } = req.params
        const modifyChapterData = req.body
        try {
            const result = await secondPartService.modifySecondPartChapterInfo(chapterId, modifyChapterData)
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_PUT_SECOND_PART_MODIFY_CHAPTER,result))
        } catch (err) {
            console.error(err)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR))
        }
    },

    deleteSecondPartChapter: async (req, res) => {
        const { chapterId } = req.params
        try {
            const result=await secondPartService.deleteSecondPartChapter(chapterId)
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_DELETE_SECOND_PART_DELETE_CHAPTER,result))
        } catch (err) {
            console.error(err)
            if (err.statusCode === 400) {
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.FAIL_TO_GET_SECOND_PART_TABLE_CONTENTS))
            }
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR))
        }
    },
    getSecondPartDiary: async (req, res) => {
        const { diaryId } = req.params
        try {
            const result=await secondPartService.getSecondPartDiary(diaryId)
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_SECOND_PART_DIARY,result))
        } catch (err) {
            console.error(err)
            if (err.statusCode === 400) {
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.FAIL_TO_GET_SECOND_PART_DIARY_ID))
            }
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR))
        }
    },
    addSecondPartDiary: async (req, res) => {
        const diaryData  = req.body
        try {
            await secondPartService.addSecondPartDiary(diaryData)
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_POST_SECOND_PART_DIARY))
        } catch (err) {
            console.error(err)
            if (err.statusCode === 400) {
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.FAIL_TO_POST_SECOND_PART_DIARY))
            }
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR))
        }
    },
    modifySecondPartDiary: async (req, res) => {
        const { diaryId } = req.params
        const diaryData=req.body
        try {
            await secondPartService.modifySecondPartDiary(diaryId,diaryData)
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_PUT_SECOND_PART_DIARY))
        } catch (err) {
            console.error(err)
            if (err.statusCode === 400) {
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.FAIL_TO_PUT_SECOND_PART_DIARY))
            }
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR))
        }
    },
    deleteSecondPartDiary: async (req, res) => {
        const { diaryId } = req.params
        try {
            await secondPartService.deleteSecondPartDiary(diaryId)
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_DELETE_SECOND_PART_DELETE_DIARY))
        } catch (err) {
            console.error(err)
            if (err.statusCode === 400) {
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.FAIL_TO_DELETE_SECOND_PART_DIARY))
            }
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR))
        }
    }
}