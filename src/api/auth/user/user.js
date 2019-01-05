const express = require('express');
const router = express.Router();
const verify = require('../../../services/verify')
const userController = require('./user.controller');
const build = require('./build/build')
const bookmark = require('./bookmarks/bookmarks')

router.use(verify.verify);
router.use('/build', build);
router.use('/bookmarks', bookmark);

//const bodyParser = require('body-parser');
//var urlencodedParser = bodyParser.urlencoded({extended: false});
//router.post('/',urlencodedParser,meController.insert_build);
//router.get('/', meController.get_all_builds_of_user);

module.exports = router;