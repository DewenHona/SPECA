const sql = require('../../../services/db');

/*
 s_id int(100) NOT NULL AUTO_INCREMENT,
 s_type varchar(100) COLLATE utf8_unicode_ci NOT NULL, 
 s_brand varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 s_model varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 s_capacity varchar(100) COLLATE utf8_unicode_ci NOT NULL
*/

const Storage = function(id, capacity, brand, model, type) {
    this.id = id;
    this.capacity = capacity;
    this.brand = brand;
    this.model = model;
    this.type = type;
}

Storage.getAllStorage = function(result) {
    sql.query('Select * from hdd', function(err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            //console.log('tasks : ', res);  
            result(null, res);
        }
    });
}

Storage.getStorageById = function(id, result) {
    sql.query(`Select * from hdd where s_id = ${id}`, function(err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            //console.log('tasks : ', res);  
            result(null, res);
        }
    });
}

module.exports = Storage;