const express = require('express');
const router = express.Router();
const ramController = require('../controllers/ram.controller');

router.get('/', ramController.get_all_rams);
router.get('/:id', ramController.get_ram_by_id);

module.exports = router;