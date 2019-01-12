const jwt = require('jsonwebtoken');
const User = require('../api/user/user.model');
const Merchant = require('../api/merchant/merchant.model')

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

exports.verify = async function(req, res, next) {
    const isUser = await checkUser(req);
    if(isUser.result) {
        req['speca_user_name'] = isUser.name;
        console.log(isUser);
        next();
    } else {
        console.log(isUser);
        res.status(400).send({auth: false});
    }       
}

exports.mverify = async function(req, res, next) {
    const isMerchant = await checkMerchant(req);
    if(isMerchant.result) {
        req['speca_merchant_name'] = isMerchant.name;
        console.log(isMerchant);
        next();
    } else {
        console.log(isMerchant);
        res.status(400).send({auth: false});
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