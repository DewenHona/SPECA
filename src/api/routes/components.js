const express = require('express');
const router = express.Router();
const componentController = require('../controllers/components.controller');
router.get('/components', componentController.get_all_components);
module.exports = router;