const jwt = require('jsonwebtoken');
const User = require('../models/user.model')

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