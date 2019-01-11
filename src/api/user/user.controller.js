const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const token_secret = require('../../config/token_secret')
const User = require('./user.model')

exports.register = async function(req, res) {
    if(!req.body.password) {
        req.send({msg:"empty body"});
        return ;
    }
    try {
        const hashed = await bcrypt.hash(req.body.password, salt);
        const token = jwt.sign({ name: req.body.name }, token_secret.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        User.addNewUser(req.body.name, hashed, token, function(err, user){
            if(err) {
                console.log(err);
                res.status(400).send({auth: false, token: null});
                return;
            }
            res.status(200).send({ auth: true, token});
        });   
    } catch (error) {
        res.status(500).send()
        console.log(error)
    }
}

exports.login = async function(req, res) {
    console.log(req.body)
    if(!req.body.password) {
        res.send({msg:"empty body"});
        return ;
    }
    console.log(req.body);
    User.getUserByUserNameAsync(req.body.name).
    then(async (user) => {
        if(user[0]) {
            const isPasswordCorrect = await bcrypt.compare(req.body.password, user[0].u_hashed);
            if(isPasswordCorrect) {
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

exports.logout = function() {

}
var genrateAndUpdateToken = function(name) {
    const token = jwt.sign({ name }, token_secret.secret, {
        expiresIn: 86400 // expires in 24 hours
    });
    User.updateToken(name, token, function(err, res) {
        if(err)
            console.log(err);
    });
    return token;
}