const jwt = require('jsonwebtoken');
const User = require('../api/user/user.model');
const Merchant = require('../api/merchant/merchant.model')

exports.verify = function(req, res, next) {
    const name = jwt.decode(req.headers.authorization);
    if(name)
    User.getUserByUserNameAsync(name.name).
        then((user) => {
            if(req.headers.authorization === user[0].u_token) {
                req['speca_user_name'] = name.name;
                next();
            } else {
                console.log({n:name,t:req.headers.authorization, k: user});
                res.send({auth: false});
            }
        }).catch(error => {
            console.log(error);
            res.send({auth: false});
        });
    else
        res.send({auth: false});
}

exports.mverify = function(req, res, next) {
    const name = jwt.decode(req.headers.authorization);
    if(name)
    Merchant.getUserByUserNameAsync(name.name).
        then((user) => {
            if(req.headers.authorization === user[0].token) {
                req['speca_merchant_name'] = name.name;
                next();
            } else {
                console.log({n:name,t:req.headers.authorization, k: user});
                res.send({auth: false});
            }
        }).catch(error => {
            console.log(error);
            res.send({auth: false});
        });
    else
        res.send({auth: false});
}

let checkUser = async function(req) {
    try {
        const name = jwt.decode(req.headers.authorization);
        if(name) {
        const user = await User.getUserByUserNameAsync(name.name);
        if(req.headers.authorization === user[0].u_token) {
            return {result:true, name:name.name};
        } else {
            return {result:false, name:null};
        }
        }  else {
            return {result:false, name:null};
        }
    } catch (error) {
        console.log(error);
        return {result:false, name:null};
    }
}

let checkMerchant = async function(req) {
    try {
        const name = jwt.decode(req.headers.authorization);
        if(name) {
        const user = await Merchant.getUserByUserNameAsync(name.name);
        if(req.headers.authorization === user[0].token) {
            return {result:true, mname:name.name};
        } else {
            return {result:false, mname:null};
        }
        }  else {
            return {result:false, mname:null};
        }    
    } catch (error) {
        console.log(error);
        return {result:false, name:null};
    }
}

exports.allverify = async function(req, res, next) {
    try {
        let result = await checkMerchant(req);
        if(result.result) {
            req['speca_merchant_name'] = result.mname;
            next();
        } else {
            let result = await checkUser(req);
            if(result.result) {
                req['speca_user_name'] = result.name;
                next();
            } else {
                res.send(404).send({auth:false});
            }
        }
    } catch (error) {
        res.send(404).send({auth:false});
        console.log(error)
    }
}