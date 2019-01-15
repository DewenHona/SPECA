const Build = {}

const sql = require('../../services/db');

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

Build.updateRequest = async function(id, bool, mname) {
    return new Promise((resolve, reject) => {
        const q = `update build set requested = ${bool}, m_name = '${mname}' where b_id = ${id}`;
        console.log(q);
        sql.query(q, (err, result) => {
            if(err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    })
    
}

Build.getAllCompletedBuildsOfUser = async (user) => {
    return new Promise((resolve, reject) => {

let q=`select derived.* from (SELECT b.b_id as B_Id, b.u_name as B_User,b.requested as B_Requested,b.m_name as B_Merchant , concat(p.p_brand,' ', p.p_model) as Processor, `
q+=`m.m_name as Motherboard, concat(g.g_model,' ',g.g_vram) as Graphics, concat(r.r_brand,' ',r.r_model,' '`
q+=`, r.r_speed, ' ', r.r_capacity) as Ram, concat(psu.psu_brand, ' ' ,psu.psu_model,' ',psu.psu_rating,' ',`
q+=`psu.psu_modular) as 'Power supply', concat(c.cooler_brand,' ',c.cooler_model) as Cooling, concat(ssd.s_type,' '`
q+=`,ssd.s_brand,' ',ssd.s_model,' ',ssd.s_capacity) as SSD, concat(hdd.s_type,' ',hdd.s_brand,' ',hdd.s_model,' '`
q+=`,hdd.s_capacity) as HDD, concat(d.disp_resolution,' ',disp_refresh_rate,' ',disp_size_type,' ',disp_panel_type)`
q+=` as Display, concat(cc.c_brand,' ',cc.c_model,' ',cc.c_form_factor) as 'Case' FROM build as b `
q+=` Inner join processor as p on b.processors = p.p_id Inner join motherboard as m on b.motherboards = m.m_id `
q+=` Inner join graphics_card as g on b.graphics = g.g_id Inner join ram as r on b.ram = r.r_id `
q+=` Inner join psu on b.psu = psu.psu_id Inner join cooling_solution as c on b.cooling = c.cooler_id `
q+=` Inner join ssd on b.ssd = ssd.s_id Inner join hdd on b.hdd = hdd.s_id Inner join display as d on b.display = d.disp_id`
q+=` Inner join cpu_case as cc on b.ccase = cc.c_id ) as derived where B_User = '${user}'`        

        sql.query(q, (err, result) => {
            if(err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

Build.getCompletedBuildById = async (id) => {
    return new Promise((resolve, reject) => {
let q=`select derived.* from (SELECT b.b_id as B_Id, b.u_name as B_User, b.requested as B_Requested,b.m_name as B_Merchant ,concat(p.p_brand,' ', p.p_model) as Processor, `
q+=`m.m_name as Motherboard, concat(g.g_model,' ',g.g_vram) as Graphics, concat(r.r_brand,' ',r.r_model,' '`
q+=`, r.r_speed, ' ', r.r_capacity) as Ram, concat(psu.psu_brand, ' ' ,psu.psu_model,' ',psu.psu_rating,' ',`
q+=`psu.psu_modular) as 'Power supply', concat(c.cooler_brand,' ',c.cooler_model) as Cooling, concat(ssd.s_type,' '`
q+=`,ssd.s_brand,' ',ssd.s_model,' ',ssd.s_capacity) as SSD, concat(hdd.s_type,' ',hdd.s_brand,' ',hdd.s_model,' '`
q+=`,hdd.s_capacity) as HDD, concat(d.disp_resolution,' ',disp_refresh_rate,' ',disp_size_type,' ',disp_panel_type)`
q+=` as Display, concat(cc.c_brand,' ',cc.c_model,' ',cc.c_form_factor) as 'Case' FROM build as b `
q+=` Inner join processor as p on b.processors = p.p_id Inner join motherboard as m on b.motherboards = m.m_id `
q+=` Inner join graphics_card as g on b.graphics = g.g_id Inner join ram as r on b.ram = r.r_id `
q+=` Inner join psu on b.psu = psu.psu_id Inner join cooling_solution as c on b.cooling = c.cooler_id `
q+=` Inner join ssd on b.ssd = ssd.s_id Inner join hdd on b.hdd = hdd.s_id Inner join display as d on b.display = d.disp_id`
q+=` Inner join cpu_case as cc on b.ccase = cc.c_id ) as derived where B_Id = ${id}`

        sql.query(q, (err, result) => {
            if(err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

module.exports = Build;