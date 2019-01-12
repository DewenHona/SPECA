const sql = require('../../services/db')

const Mbuild = function(name, id, uname,contact) {
    this.m_name = name;
    this.b_id = id;
    this.u_name = uname;
    this.contact = contact;
}

Mbuild.insert = async (mname, bid, uname, contact) => {
    return new Promise((resolve, reject) => {
        let q = `insert into merchant_build values('${mname}',${bid},'${uname}','${contact}')`
        console.log(q);
        sql.query(q, function(err, result) {
            if(err)
                reject(err)
            else
                resolve(result)
        });
    })
}

Mbuild.getMbuildsByMname = async (mname) => {
    return new Promise((resolve, reject) => {
        let q = `select * from merchant_build where m_name = '${mname}'`
        console.log(q);
        sql.query(q, function(err, result) {
            if(err)
                reject(err)
            else
                resolve(result)
        });
    })
}

Mbuild.getMbuildsByMnameAndUname = async (mname, uname) => {
    return new Promise((resolve, reject) => {
        let q = `select * from merchant_build where m_name = '${mname}'and u_name = '${uname}'`
        console.log(q);
        sql.query(q, function(err, result) {
            if(err)
                reject(err)
            else
                resolve(result)
        });
    })
}

Mbuild.getMbuildById = async (id) => {
    return new Promise((resolve, reject) => {
        let q = `select * from merchant_build where b_id = ${id}`
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