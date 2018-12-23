const express = require('express');
const router = express.Router();
const componentController = require('./components.controller');

router.get('/', componentController.get_all_components);

const processor = require('./processor/processors');
const motherboard = require('./motherboard/motherboards');
const graphic = require('./graphics/graphics');
const psu = require('./psu/psu')
const ram = require('./ram/ram');
const cooling = require('./cooling/cooling');
const display = require('./display/display');
const ccase = require('./ccase/ccase');
const ssd = require('./ssd/ssd');
const hdd = require('./hdd/hdd');

router.use('/processors',processor);
router.use('/motherboards',motherboard);
router.use('/graphics',graphic);
router.use('/ram',ram);
router.use('/psu', psu);
router.use('/cooling', cooling);
router.use('/ssd', ssd);
router.use('/hdd', hdd);
router.use('/display', display);
router.use('/case', ccase);


module.exports = router;