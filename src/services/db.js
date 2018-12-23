'user strict';

var mysql = require('mysql');
var secret = require('../config/db')
//local mysql db connection
var connection = mysql.createConnection(secret);

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;