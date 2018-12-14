const Ccase = require('../models/ccase.model');

exports.get_all_ccase = function(req, res) {
    Ccase.getAllCcase(function(err, ccase) {
        if(err) 
            res.send(err);
        console.log('res', ccase);
        res.send(ccase);
    });
}

exports.get_ccase_by_id = function(req, res) {
    Ccase.getCcaseById(req.params.id, function(err, ccase) {
        if(err) 
            res.send(err);
        console.log('res', ccase);
        res.send(ccase);
    });
}