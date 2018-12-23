const express = require('express');
const router = express.Router();
const displayController = require('./display.controller');

router.get('/', displayController.get_all_display);
router.get('/:id', displayController.get_display_by_id);

module.exports = router;