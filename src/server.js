const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');

const mysql = require('mysql');
// connection configurations
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'speca',
    insecureAuth : true
});
 
// connect to database
mc.connect();

app.use('/', express.static(__dirname + '/public'))

app.get('/', (req, res) => res.redirect('/home.html'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const cc = require('../src/api/controllers/components.controller')

const routes = require('./api/routes/routes'); //importing route
routes(app);