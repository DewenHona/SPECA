const express = require('express');
const router = express.Router();
const verify = require('../../../../services/verify')
const buildController = require('./build.controller');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const auto = require('./auto')

router.use(verify.verify);
router.use(urlencodedParser);
router.post('/', buildController.insert_build);
router.get('/', buildController.get_all_builds_of_user);
router.post('/auto', auto.getAutoBuild);
module.exports = router;