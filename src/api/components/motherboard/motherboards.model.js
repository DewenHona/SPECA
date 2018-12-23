const sql = require('../../../services/db');

/*
    m_id int primary key, 
    m_name varchar(30), 
    m_oc varchar(10), 
    m_form_factor varchar(10), 
    m_usage varchar(10)
*/

const Motherboard = function(id, name, oc, form_factor, usage) {
    this.id = id;
    this.name = name;
    this.oc = oc;
    this.form_factor = form_factor;
    this.usage = usage;
}

Motherboard.getAllMotherboards = function(result) {
    sql.query('Select * from motherboard', function(err, res) {
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

Motherboard.getMotherboardById = function(id, result) {
    sql.query(`Select * from motherboard where m_id = ${id}`, function(err, res) {
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

module.exports = Motherboard;