const sql = require('../../services/db');

const Merchant = function(name, firm, password, token) {
    this.firm = firm;
    this.name = name;
    this.passsword = password;
    this.token = token;
}

Merchant.getUserByUserName = function(name, result) {
    q = 'Select * from merchant where name = ' + sql.escape(name);
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

Merchant.getUserByUserNameAsync = async function(name) {
    //return sql.query('Select * from merchant where u_name = ' + sql.escape(name));
    return new Promise((resolve, reject) => {
        sql.query('Select * from merchant where name = ' + sql.escape(name), (err, res) => {
            if(err)
                return reject(err);
            resolve(res);
        });
    });
}

Merchant.addNewUser = function(name,firm, hashed, token,result) {
    q = "insert into merchant values("+ sql.escape(name) +","+ sql.escape(firm) +","+ sql.escape(hashed)+ "," + sql.escape(token)+")";
    sql.query(q, function(err, res) {
        if(err) {
            result(err,res);
        } else {
            result(null,res);
        }
    });
}

Merchant.updateToken = function(name, token, result) {
    q = `update merchant set token = '${token}' where name = '${name}'`;
    sql.query(q, function(err, res) {
            result(err,res);
    });
}

Merchant.getAll = async function() {
    return new Promise((resolve, reject) => {
        sql.query('Select name, firm from merchant', (err, res) => {
            if(err)
                reject(err);
            resolve(res);
        });
    });
}

module.exports = Merchant;