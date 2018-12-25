const sql = require('../db');

exports.getRamIdByRId = function(id) {
    return new Promise((resolve, reject) => {
        const q = `select ram_id from purpose_ram where r_id = ${id}`;
        sql.query(q, (err, result) => {
            if(err) {
                reject(err);
            } else {
                console.log(q);
                console.log(result)
                resolve(result[0].ram_id);
            }
        });
    });
}

exports.getRamIdByPId = function(id) {
    return new Promise((resolve, reject) => {
        const q = `select ram_id from purpose_ram where p_id = ${id}`;
        sql.query(q, (err, result) => {
            if(err) {
                console.log(err);
                reject(err);
            } else {
                console.log(q);
                console.log(result)
                resolve(result[0].ram_id);
            }
        });
    });
}