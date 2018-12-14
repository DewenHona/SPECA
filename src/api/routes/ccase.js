const express = require('express');
const router = express.Router();
const ccaseController = require('../controllers/ccase.controller');

router.get('/', ccaseController.get_all_ccase);
router.get('/:id', ccaseController.get_ccase_by_id);

module.exports = router;