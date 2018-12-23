const express = require('express');
const router = express.Router();
const ssdController = require('./ssd.controller');

router.get('/', ssdController.get_all_storage);
router.get('/:id', ssdController.get_storage_by_id);

module.exports = router;