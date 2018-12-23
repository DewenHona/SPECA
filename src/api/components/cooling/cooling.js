const express = require('express');
const router = express.Router();
const coolingController = require('./cooling.controller');

router.get('/', coolingController.get_all_cooling);
router.get('/:id', coolingController.get_cooling_by_id);

module.exports = router;