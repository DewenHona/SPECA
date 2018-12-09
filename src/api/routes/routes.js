'use strict';
module.exports = function(app) {
    const component = require('./components');
    app.use('/api',component);
};