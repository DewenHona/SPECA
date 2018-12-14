const express = require('express');
const router = express.Router();
const psuController = require('../controllers/psu.controller');

router.get('/', psuController.get_all_psu);
router.get('/:id', psuController.get_psu_by_id);

module.exports = router;