const sql = require('../../../services/db');

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
            //console.log('tasks : ', res);  
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
            //console.log('tasks : ', res);  
            result(null, res);
        }
    });
}

Ccase.getCaseBySize = function(size) {
    return new Promise((resolve, reject) => {
        const q = `select c_id from cpu_case where c_form_factor = '${size}'`;
        sql.query(q, function(err, result) {
            if(err) {
                reject(err);
             } else {
                 console.log(q);
                 console.log(result)
                 resolve(result[0].c_id);
             }
        });
    });
}

module.exports = Ccase;