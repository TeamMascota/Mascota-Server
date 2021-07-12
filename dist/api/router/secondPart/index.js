var express = require('express');
var router = express.Router();
const secondPartController = require('../../controller/secondPartController');
router.get('/main/:userId', secondPartController.getMainPage);
router.get('/chapter/user/:tableContentsId', secondPartController.getDiaryOfTableContents);
router.get('/chapter/list', secondPartController.getSecondPartChapterList);
router.post('/chapter', secondPartController.addSecondPartChapter);
router.put('/chapter/:chapterId', secondPartController.modifySecondPartChapterInfo);
router.delete('/chapter/:chapterId', secondPartController.deleteSecondPartChapter);
module.exports = router;
//# sourceMappingURL=index.js.map