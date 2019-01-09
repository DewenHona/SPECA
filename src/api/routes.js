module.exports = function(app) {
    const component = require('./components/components');
    const auth = require('./auth/auth');
    const merchant = require('./merchant/merchant')

    app.use('/api/components',component);
    app.use('/api/auth',auth);
    app.use('/api/merchant', merchant)
};