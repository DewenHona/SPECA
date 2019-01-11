const Build = {}

const sql = require('../../../../services/db');

Build.insertBuild = function(json, result) {
    let q = `insert into build (u_name,b_title,processors,motherboards,graphics,ram,psu,cooling,ssd,hdd,display,ccase)`
    q += `values('${json.u_name}','${json.title}',${json.processors},${json.motherboards},${json.graphics},${json.ram}`
    q += `,${json.psu},${json.cooling},${json.ssd},${json.hdd},${json.display},${json.ccase})`
    console.log(q);
    sql.query(q, function(err, res) {
            result(err,res);
    });
}

Build.getAllBuildsOfUser = function(user, result) {
    let q = `select * from build where u_name = '${user}'`
    sql.query(q, function(err, res){
        result(err,res);
    });
}

Build.getBuildById = async (id) => {
    return new Promise((resolve, reject) => {
        let q = `select * from build where b_id = ${id}`;
        sql.query(q, (err, result) => {
            if(err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

Build.deleteBuildById = async function(id) {
    return new Promise((resolve, reject) => {
        const q = `delete from build where b_id = ${id}`;
        sql.query(q, (err, result) => {
            if(err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    })
    
}

Build.putBuildById = async function(id, json) {
    return new Promise((resolve, reject) => {
        let q = `update build set `;
        q += `b_title = '${json.title}', processors = ${json.processors}, motherboards = ${json.motherboards}, `;
        q += `graphics = ${json.graphics}, ram = ${json.ram}, psu = ${json.psu}, cooling = ${json.cooling}, `;
        q += `ssd = ${json.ssd}, hdd = ${json.hdd}, display = ${json.display}, ccase = ${json.ccase} `;
        q += `where b_id = ${id}`;
        console.log(q);
        sql.query(q, function(err, res) {
            if(err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
        
}

module.exports = Build;