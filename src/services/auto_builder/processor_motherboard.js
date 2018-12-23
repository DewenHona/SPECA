const sql = require('../db');

exports.getMoboIDByCpuAndSize = function (id, size) {
    return new Promise((resolve, reject) => {
        var q = `select m_id from motherboard where m_form_factor = '${size}' and m_id IN` ;
        q += `(select m_id from processor_motherboard where p_id = ${id})`;
        sql.query(q, (err, result) => {
            if(err) {
               reject(err);
            } else {
                console.log(q);
                console.log(result)
                resolve(result[0].m_id);
            }
        });
    })
}