const express = require('express');
const router = express.Router();
const controller = require('./bookmarks.controller');

router.get('/',controller.getAllBookmarks);
router.post('/',controller.postBookmark)

module.exports = router;