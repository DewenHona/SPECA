const sql = require('./db');

const User = function(username, hashed, token) {
    this.username = username;
    this.hashed = hashed;
    this.token = token;
}

User.getUserByUserName = function(name, result) {
    q = 'Select * from user where u_name = ' + sql.escape(name);
    sql.query(q, function(err, res) {
        if(err) {
            result(err, res);
        } else {
            result(null, res);
        }
    });
}

/*function query1( sql, args ) {
    return new Promise( ( resolve, reject ) => {
        this.connection.query( sql, args, ( err, rows ) => {
            if ( err )
                return reject( err );
            resolve( rows );
        } );
    } );
}*/

User.getUserByUserNameAsync = async function(name) {
    //return sql.query('Select * from user where u_name = ' + sql.escape(name));
    return new Promise((resolve, reject) => {
        sql.query('Select * from user where u_name = ' + sql.escape(name), (err, res) => {
            if(err)
                return reject(err);
            resolve(res);
        });
    });
}

User.addNewUser = function(name, hashed, result) {
    q = "insert into user values("+ sql.escape(name) +"," + sql.escape(hashed)+")";
    sql.query(q, function(err, res) {
        if(err) {
            result(err,res);
        } else {
            result(null,res);
        }
    });
}

User.updateToken = function(name, token, result) {
    q = `update user set u_token = '${token}' where u_name = '${name}'`;
    sql.query(q, function(err, res) {
            result(err,res);
    });
}

module.exports = User;