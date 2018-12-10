'use strict';
module.exports = function(app) {
    const component = require('./components');
    const processor = require('./processors');
    const motherboard = require('./motherboards')
    app.use('/api/components',component);
    app.use('/api/components/processors',processor);
    app.use('/api/components/motherboards',motherboard);
};