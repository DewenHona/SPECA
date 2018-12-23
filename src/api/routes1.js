'use strict';
module.exports = function(app) {
    const component = require('./components/components');
    const processor = require('./components/processor/processors');
    const motherboard = require('./motherboards');
    const auth = require('./routes/auth');
    const graphic = require('./graphics');
    const psu = require('./components/psu/psu')
    const ram = require('./components/ram/ram');
    //const storage = require('./storage');
    const cooling = require('./components/cooling/cooling');
    const display = require('./display');
    const ccase = require('./components/ccase/ccase');
    const me = require('./routes/me');
    const ssd = require('./components/ssd/ssd');
    const hdd = require('./components/hdd/hdd');
    app.use('/api/components',component);
    app.use('/api/components/processors',processor);
    app.use('/api/components/motherboards',motherboard);
    app.use('/api/components/graphics',graphic);
    app.use('/api/components/ram',ram);
    app.use('/api/components/psu', psu);
    app.use('/api/components/cooling', cooling);
    app.use('/api/components/storage', storage);
    app.use('/api/components/ssd', ssd);
    app.use('/api/components/hdd', hdd);
    app.use('/api/components/display', display);
    app.use('/api/components/case', ccase);
    app.use('/api/auth',auth);
    app.use('/api/me',me);
};

