const express = require('express');
const router = express.Router();
const controller = require('./bookmarks.controller');

router.get('/',controller.getAllBookmarks);
router.post('/',controller.postBookmark)
router.delete('/:type/:id', controller.deleteBookmark);
module.exports = router;