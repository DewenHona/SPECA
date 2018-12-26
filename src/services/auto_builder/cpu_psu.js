const sql = require('../db');

exports.getPsuIdByCpuId = function(id) {
    return new Promise((resolve, reject) => {
        const q = `select psu_id from cpu_psu where p_id = ${id}`;
        sql.query(q, (err, result) => {
            if(err) {
                reject(err);
            } else {
                console.log(q);
                console.log(result)
                resolve(result[0].psu_id);
            }
        });
    });
}