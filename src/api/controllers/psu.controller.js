const Psu = require('../models/psu.model');

exports.get_all_psu = function(req, res) {
    Psu.getAllPsu(function(err, psu) {
        if(err) 
            res.send(err);
        console.log('res', psu);
        res.send(psu);
    });
}

exports.get_psu_by_id = function(req, res) {
    Psu.getPsuById(req.params.id, function(err, psu) {
        if(err) 
            res.send(err);
        console.log('res', psu);
        res.send(psu);
    });
}