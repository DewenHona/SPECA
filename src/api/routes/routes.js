'use strict';
module.exports = function(app) {
    const component = require('./components');
    const processor = require('./processors');
    const motherboard = require('./motherboards');
    const auth = require('./auth');
    app.use('/api/components',component);
    app.use('/api/components/processors',processor);
    app.use('/api/components/motherboards',motherboard);
    app.use('/api/auth',auth);
};