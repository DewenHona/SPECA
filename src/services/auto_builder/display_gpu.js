const sql = require('../db');

exports.getGpuIdByDispId = function(id) {
    return new Promise((resolve, reject) => {
        const q = `select g_id from display_gpu where disp_id = ${id}`;
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