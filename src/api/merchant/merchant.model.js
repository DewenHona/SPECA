const sql = require('../../services/db');

const Merchant = function(id, name, password, token) {
    this.id = id;
    this.name = name;
    this.passsword = password;
    this.token = token;
}