const sql = require('../../services/db')

const Mbuild = function(name, id, contact) {
    this.m_name = name,
    this.b_id = id,
    this.contact = contact
}

Mbuild.insert = async (mname, bid, contact) => {
    return new Promise((resolve, reject) => {
        let q = `insert into merchant_build values('${mname}',${bid},'${contact}')`
        console.log(q);
        sql.query(q, function(err, result) {
            if(err)
                reject(err)
            else
                resolve(result)
        });
    })
}

module.exports = Mbuild;