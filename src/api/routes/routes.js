'use strict';
module.exports = function(app) {
    const component = require('./components');
    const processor = require('./processors');
    app.use('/api/components',component);
    app.use('/api/components/processors',processor);
};