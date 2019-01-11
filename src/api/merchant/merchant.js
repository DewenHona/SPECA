const express = require('express');
const router = express.Router();
const controller =  require('./merchant.controller')
const auth =  require('../../services/auth')
const mbuild = require('../mbuild/mbuild.js')

router.post('/', controller.register);
router.get('/', controller.getAllMerchants);
router.post('/:name/login', controller.login);

router.use('/:name/builds', auth.allverify);
router.use('/:name/builds', mbuild);

router.use('/:name/logout', auth.mverify);
router.post('/:name/logout', controller.logout);

module.exports = router;