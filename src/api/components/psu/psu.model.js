const sql = require('../../../services/db');

/*
    psu_id int(100) NOT NULL AUTO_INCREMENT,
 psu_brand varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 psu_model varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 psu_rating varchar(100) COLLATE utf8_unicode_ci NOT NULL, 
 psu_modular varchar(10) COLLATE utf8_unicode_ci NOT NULL
*/

const Psu = function(id, modular, brand, model, rating) {
    this.id = id;
    this.modular = modular;
    this.brand = brand;
    this.model = model;
    this.rating = rating;
}

Psu.getAllPsu = function(result) {
    sql.query('Select * from psu', function(err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('tasks : ', res);  
            result(null, res);
        }
    });
}

Psu.getPsuById = function(id, result) {
    sql.query(`Select * from psu where psu_id = ${id}`, function(err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('tasks : ', res);  
            result(null, res);
        }
    });
}

module.exports = Psu;