const express = require('express');
const router = express.Router();
const buildController = require('./build.controller');
const auto = require('./auto')

router.post('/', buildController.insert_build);
router.get('/', buildController.get_all_builds_of_user);

router.put('/:id', buildController.put_build);
router.delete('/:id', buildController.delete_build);

router.post('/auto', auto.getAutoBuild);
router.get('/auto', auto.getQuestions);

module.exports = router;