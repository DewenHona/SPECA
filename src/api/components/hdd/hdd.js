const express = require('express');
const router = express.Router();
const storageController = require('./hdd.controller');

router.get('/', storageController.get_all_storage);
router.get('/:id', storageController.get_storage_by_id);

module.exports = router;