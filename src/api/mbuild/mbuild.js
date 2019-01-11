const express = require('express');
const router = express.Router();
const controller = require('./mbuild.controller');

router.post('/', controller.createRequest);

module.exports = router;