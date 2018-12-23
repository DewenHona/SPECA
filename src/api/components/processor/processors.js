const express = require('express');
const router = express.Router();

const processorController = require('./processors.controller');
router.get('/', processorController.get_all_processors);
router.get('/:id',processorController.get_processor_by_id);
module.exports = router;