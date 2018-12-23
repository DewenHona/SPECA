const sql = require('../db');

exports.getCpuIdByRId = function(id) {
    return new Promise((resolve, reject) => {
        const q = `select cpu_id from purpose_cpu where r_id = ${id}`;
        sql.query(q, (err, result) => {
            if(err) {
                reject(err);
            } else {
                console.log(q);
                console.log(result)
                resolve(result[0].cpu_id);
            }
        });
    });
}