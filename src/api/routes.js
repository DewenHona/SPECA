module.exports = function(app) {
    const component = require('./components/components');
    const auth = require('./auth/auth');

    app.use('/api/components',component);
    app.use('/api/auth',auth);
};