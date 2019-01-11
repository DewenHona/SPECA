const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const routes = require('./api/routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/public'))
app.get('/', (req, res) => res.redirect('/home.html'))
routes(app);
module.exports = app;