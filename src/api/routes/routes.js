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
    app.use('/api/components',component);
    app.use('/api/components/processors',processor);
    app.use('/api/components/motherboards',motherboard);
    app.use('/api/components/graphics',graphic);
    app.use('/api/components/ram',ram);
    app.use('/api/components/psu', psu);
    app.use('/api/components/cooling', cooling);
    app.use('/api/components/storage', storage);
    app.use('/api/auth',auth);
};

