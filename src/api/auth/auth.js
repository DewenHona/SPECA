const express = require('express');
const router = express.Router();

const authController = require('./auth.controller')
const user = require('./user/user');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/authenticate', authController.authenticate);
router.use('/user',user);
module.exports = router;