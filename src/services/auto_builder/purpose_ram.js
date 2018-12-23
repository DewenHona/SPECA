const sql = require('../db');

exports.getRamIdByRId = function(id) {
    return new Promise((resolve, reject) => {
        const q = `select r_id from purpose_ram where r_id = ${id}`;
        sql.query(q, (err, result) => {
            if(err) {
                reject(err);
            } else {
                console.log(q);
                console.log(result)
                resolve(result[0].r_id);
            }
        });
    });
}