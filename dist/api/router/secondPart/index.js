var express = require('express');
var router = express.Router();
const secondPartController = require('../../controller/secondPartController');
router.get('/main/:userId', secondPartController.getMainPage);
router.get('/chapter/user/:tableContentsId', secondPartController.getDiaryOfTableContents);
router.get('/chapter/list', secondPartController.getSecondPartChapterList);
router.post('/chapter', secondPartController.addSecondPartChapter);
router.put('/chapter/:chapterId', secondPartController.modifySecondPartChapterInfo);
router.delete('/chapter/:chapterId', secondPartController.deleteSecondPartChapter);
router.get('/diary/user/:diaryId', secondPartController.getSecondPartDiary); //2부 일기 조회
router.post('/diary/user', secondPartController.addSecondPartDiary); //2부 일기 작성
router.put('/diary/user/:diaryId', secondPartController.modifySecondPartDiary); //2부 일기 수정
router.delete('/diary/user/:diaryId', secondPartController.deleteSecondPartDiary); //2부 일기 삭제
module.exports = router;
//# sourceMappingURL=index.js.map