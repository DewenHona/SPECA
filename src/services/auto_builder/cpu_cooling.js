const sql = require('../db');

exports.getCoolerIdByCpuId = function(id) {
    return new Promise((resolve, reject) => {
        const q = `select cooler_id from cpu_cooling where p_id = ${id}`;
        sql.query(q, (err, result) => {
            if(err) {
                reject(err);
            } else {
                console.log(q);
                console.log(result)
                resolve(result[0].cooler_id);
            }
        });
    });
}