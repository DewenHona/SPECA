const sql = require('./db');

/*
c_id int(100) NOT NULL AUTO_INCREMENT,
 c_brand varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 c_model varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 c_form_factor varchar(100) COLLATE utf8_unicode_ci NOT NULL,
*/

const Ccase = function(id, brand, model, form_factor) {
    this.id = id;
    this.brand = brand;
    this.model = model;
    this.form_factor = form_factor;
}

Ccase.getAllCcase = function(result) {
    sql.query('Select * from cpu_case', function(err, res) {
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

Ccase.getCcaseById = function(id, result) {
    sql.query(`Select * from cpu_case where c_id = ${id}`, function(err, res) {
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

module.exports = Ccase;