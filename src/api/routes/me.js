const express = require('express');
const router = express.Router();
const meController = require('../controllers/me.controller');

const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
////router.use(bodyParser.urlencoded())
////router.use(bodyParser.json())
router.post('/',urlencodedParser,meController.test);

module.exports = router;