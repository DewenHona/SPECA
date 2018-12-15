const express = require('express');
const router = express.Router();
const meController = require('../controllers/me.controller');
const verify = require('../services/verify')
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
////router.use(bodyParser.urlencoded())
////router.use(bodyParser.json())

router.use(verify.verify);

router.post('/',urlencodedParser,meController.insert_build);
router.get('/', meController.get_all_builds_of_user);

module.exports = router;