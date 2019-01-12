const express = require('express');
const router = express.Router();
const buildController = require('./build.controller');
const auto = require('./auto')
const auth = require('../../services/auth')

router.use('/', auth.allverify)
router.post('/', buildController.insert_build);
router.get('/', buildController.get_all_builds_of_user);

//router.get('/:id', auth.allverify)
router.get('/:id', buildController.get_build_by_id);
router.put('/:id', buildController.put_build);
router.delete('/:id', buildController.delete_build);

//router.use('/auto', auth.verify);
router.post('/auto', auto.getAutoBuild);
router.get('/auto', auto.getQuestions);

module.exports = router;