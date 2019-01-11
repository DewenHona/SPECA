module.exports = function(app) {
    const component = require('./components/components');
    const user = require('./user/user');
    const merchant = require('./merchant/merchant')

    app.use('/api/components',component);
    app.use('/api/users',user);
    app.use('/api/merchants', merchant)
};