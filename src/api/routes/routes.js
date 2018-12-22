'use strict';
module.exports = function(app) {
    const component = require('./components');
    const processor = require('./processors');
    const motherboard = require('./motherboards');
    const auth = require('./auth');
    const graphic = require('./graphics');
    const psu = require('./psu')
    const ram = require('./ram');
    const storage = require('./storage');
    const cooling = require('./cooling');
    const display = require('./display');
    const ccase = require('./ccase');
    const me = require('./me');
    const ssd = require('./ssd');
    const hdd = require('./hdd');
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

