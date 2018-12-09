'user strict';
const sql = require('./db.js');

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

module.exports = Component;
