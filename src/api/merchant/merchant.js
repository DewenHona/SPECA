const express = require('express');
const router = express.Router();
const controller =  require('./merchant.controller')
const auth =  require('../../services/auth')
const mbuild = require('../mbuild/mbuild.controller')

router.post('/', controller.register);
router.get('/', controller.getAllMerchants);
router.post('/:name/login', controller.login);

router.use('/:name/builds', auth.allverify);
router.post('/:name/builds', mbuild.createRequest);
router.get('/:name/builds', mbuild.getMBuilds);

router.use('/:name/logout', auth.mverify);
router.post('/:name/logout', controller.logout);

module.exports = router;