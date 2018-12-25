const sql = require('../db');

exports.getGpuIdByRId = function(id) {
    return new Promise((resolve, reject) => {
        const q = `select g_id from purpose_gpu where r_id = ${id}`;
        sql.query(q, (err, result) => {
            if(err) {
                reject(err);
            } else {
                console.log(q);
                console.log(result)
                resolve(result[0].g_id);
            }
        });
    });
}