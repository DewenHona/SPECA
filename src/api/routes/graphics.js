const express = require('express');
const router = express.Router();
const graphicController = require('../controllers/graphics.controller');

router.get('/', graphicController.get_all_graphics);
router.get('/:id', graphicController.get_graphic_by_id);

module.exports = router;