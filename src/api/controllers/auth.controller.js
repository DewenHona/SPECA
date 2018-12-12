const User = require('../models/user.model');
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
    const hashed = bcrypt.hashSync(req.body.password, salt);
    User.addNewUser(req.body.name, hashed, function(err, user){
        if(err) {
            console.log(err);
            res.status(500).send("There was a problem registering the user.");
            return;
        }
        res.status(200).send({ auth: true});
    });
}

exports.login = async function(req, res) {
    const hashed = bcrypt.hashSync(req.body.password, salt);
    User.getUserByUserNameAsync(req.body.name).
    then((user) => {
        if(bcrypt.compareSync(req.body.password, user[0].u_hashed)) {
            res.send({auth: true, token: genrateAndUpdateToken(req.body.name)});
        } else {
            res.send({auth: false, token: null});
        }
    });
}

