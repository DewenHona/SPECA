'user strict';
const sql = require('../../../services/db');

/*
    p_id int primary key, 
    p_brand varchar(10), 
    p_model varchar(20), 
    p_socket varchar(20), 
    p_oc bool
*/

const Processor = function(id, brand, model, socket, oc) {
    this.id = id;
    this.brand = brand;
    this.model = model;
    this.socket = socket;
    this.oc = oc;
}

Processor.getAllProcessors = function(result) {
    sql.query("Select * from processor", function (err, res) {

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

Processor.getProcessorById = function(id, result) {
    sql.query(`Select * from processor where p_id = ${id}`, function(err, res) {
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

module.exports = Processor;