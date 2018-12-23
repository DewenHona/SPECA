const sql = require('../../../services/db');

/*
    cooler_id int(100) NOT NULL AUTO_INCREMENT,
 cooler_brand varchar(100) COLLATE utf8_unicode_ci NOT NULL, 
 cooler_model varchar(100) COLLATE utf8_unicode_ci NOT NULL,
*/

const Cooling = function(id, brand, model) {
    this.id = id;
    this.brand = brand;
    this.model = model;
}

Cooling.getAllCooling = function(result) {
    sql.query('Select * from cooling_solution', function(err, res) {
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

Cooling.getCoolingById = function(id, result) {
    sql.query(`Select * from cooling_solution where cooler_id = ${id}`, function(err, res) {
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

module.exports = Cooling;