"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const chapterController = require('../../controller/chapterController');
router.get('/pet/:id', chapterController.getChapterDiary); //1부 목차별 일기 조회
router.get('/:id', chapterController.getChapterList); //목차리스트 조회
router.post('/:id', chapterController.postChapterList); //목차리스트 추가
router.put('/:id', chapterController.putChapterList); //목차리스트 수정
router.delete('/:id', chapterController.deleteChapterList); //목차리스트 삭제
module.exports = router;
//# sourceMappingURL=index.js.map