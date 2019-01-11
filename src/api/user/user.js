const express = require('express');
const router = express.Router();
const auth = require('../../services/auth')
const userController = require('./user.controller');
const build = require('../build/build')
const bookmark = require('../bookmarks/bookmarks')

router.post('/', userController.register);
router.post('/:name/login', userController.login);

router.use('/:name/logout', auth.verify);
router.post('/:name/logout', userController.logout);

router.use('/:name/builds', auth.verify);
router.use('/:name/builds', build);

router.use('/:name/bookmarks', auth.verify);
router.use('/:name/bookmarks', bookmark);

module.exports = router;