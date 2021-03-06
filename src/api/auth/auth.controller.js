const User = require('./user/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

var salt = bcrypt.genSaltSync(10);

const genrateAndUpdateToken = function(name) {
    const token = jwt.sign({ name }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
    });
    User.updateToken(name, token, function(err, res) {
        if(err)
            console.log(err);
    });
    return token;
}

exports.register = function(req, res) {
    if(!req.body.password) {
        req.send({msg:"empty body"});
        return ;
    }
    const hashed = bcrypt.hashSync(req.body.password, salt);
    const token = jwt.sign({ name: req.body.name }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
    });
    User.addNewUser(req.body.name, hashed, token, function(err, user){
        if(err) {
            console.log(err);
            res.send({auth: false, token: null});
            return;
        }
        res.status(200).send({ auth: true, token});
    });
}

exports.login = async function(req, res) {
    if(!req.body.password) {
        res.send({msg:"empty body"});
        return ;
    }
    console.log(req.body);
    const hashed = bcrypt.hashSync(req.body.password, salt);
    
    User.getUserByUserNameAsync(req.body.name).
    then((user) => {
        if(user[0]) {
            if(bcrypt.compareSync(req.body.password, user[0].u_hashed)) {
                res.send({auth: true, token: genrateAndUpdateToken(req.body.name)});
            } else {
                res.send({auth: false, token: null});
            }
        } else {
            res.send({auth: false, token: null});
        }
        
    }).catch(error => {
        console.log(error);
        res.send({auth: false, token: null});
    }); 
    
}

exports.authenticate = function(req, res) {
    const name = jwt.decode(req.headers.authorization);
    if(name)
    User.getUserByUserNameAsync(name.name).
        then((user) => {
            if(req.headers.authorization === user[0].u_token) {
                res.send({auth: true, token: user[0].u_token})
            } else {
                console.log({n:name,t:req.headers.authorization, k: user});
                res.send({auth: false, token: null});
            }
        }).catch(error => {
            console.log(error);
            res.send({auth: false, token: null});
        });
    else
        res.send({auth: false, token: null});

    //User.getUserByUserName(req.body.name)
}

