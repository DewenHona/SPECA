const sql = require('../db')

exports.getPurposeByName = function(name) {
    return new Promise((resolve, reject) => {
        sql.query(`select p_id from purpose where p_name = '${name}'`, (err, result) => {
            if(err) {
                reject(err);
            } else {
                resolve(result[0]);
            }
        });
    });
}