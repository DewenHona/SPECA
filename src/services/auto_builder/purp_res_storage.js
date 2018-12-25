const sql = require('../db');

exports.getStorageIdByPIdAndRes = function(pid,res) {
    return new Promise((resolve, reject) => {
        const q = `select s_id, h_id from purp_res_storage where p_id = ${pid} and res = '${res}'`;
        sql.query(q, (err, result) => {
            if(err) {
                reject(err);
            } else {
                console.log(q);
                console.log(result)
                resolve(result[0]);
            }
        });
    });
}