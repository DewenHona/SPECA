const express = require('express');
const router = express.Router();
const motherboardController = require('../controllers/motherboards.controller');

router.get('/', motherboardController.get_all_motherboards);
router.get('/:id', motherboardController.get_motherboard_by_id);

module.exports = router;