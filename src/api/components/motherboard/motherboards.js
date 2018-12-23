const express = require('express');
const router = express.Router();
const motherboardController = require('../motherboard/motherboards.controller');

router.get('/', motherboardController.get_all_motherboards);
router.get('/:id', motherboardController.get_motherboard_by_id);

module.exports = router;