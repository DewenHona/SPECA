const express = require('express');
const router = express.Router();
const controller =  require('./merchant.controller')

router.post('/', controller.register);
router.get('/', controller.getAllMerchants);
router.post('/:name/login', controller.login);

//router.use('/:name/logout', auth.verify);
router.post('/:name/logout', controller.logout);

module.exports = router;