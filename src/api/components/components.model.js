'user strict';
const sql = require('../../services/db');

const Component = function(id, name) {
    this.id = id;
    this.name = name;
}

Component.getAllComponents = function(result) {
    sql.query("Select * from components", function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
          console.log('tasks : ', res);  

         result(null, res);
        }
    });
}

Component.getComponentById = async (id) => {
    return new Promise((resolve, reject) => {
        let q = `select c_name, c_pk from components where c_id = ${id}`;
        console.log(q)
        sql.query(q, function(err, result) {
            if(err)
                reject(err)
            else if(!result[0] || !result[0].c_name) 
                reject("no component found")
            else
                resolve(result[0])
        }) 
    });
}

Component.getComponentByTypeAndId = async (name, pk, id) => {
    return new Promise((resolve, reject) => {
        let q = `select * from ${name} where ${pk} = ${id}`;
        sql.query(q, function(err, result) {
            if(err) 
                reject(err)
            else if(!result[0] || !result[0][pk]) 
                reject("no component found")
            else
                resolve(result[0])
        })
    });
}

module.exports = Component;
