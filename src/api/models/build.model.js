const Build = {}

const sql = require('./db');

Build.insertBuild = function(json, result) {
    let q = `insert into build (u_name,processors,motherboards,graphics,ram,psu,cooling,storage,display,ccase)`
    q += `values('${json.u_name}',${json.processors},${json.motherboards},${json.graphics},${json.ram}`
    q += `,${json.psu},${json.cooling},${json.storage},${json.display},${json.ccase})`
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

module.exports = Build;