const sql = require('../../../services/db');

/*
    r_id int(100) NOT NULL AUTO_INCREMENT,
 r_brand varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 r_model varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 r_speed varchar(100) COLLATE utf8_unicode_ci NOT NULL, 
 r_capacity varchar(100) COLLATE utf8_unicode_ci NOT NULL
*/

const Ram = function(id, brand, model, speed, capacity) {
    this.id = id;
    this.speed = speed;
    this.brand = brand;
    this.model = model;
    this.capacity = capacity;
}

Ram.getAllRams = function(result) {
    sql.query('Select * from ram', function(err, res) {
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

Ram.getRamById = function(id, result) {
    sql.query(`Select * from ram where r_id = ${id}`, function(err, res) {
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

module.exports = Ram;