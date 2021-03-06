const Motherboard = require('../motherboard/motherboards.model');

exports.get_all_motherboards = function(req, res) {
    Motherboard.getAllMotherboards(function(err, motherboards) {
        if(err) {
            res.send("error");
            console.log(err);
        }
        console.log('get all mobo');
        res.send(motherboards);
    });
}

exports.get_motherboard_by_id = function(req, res) {
    Motherboard.getMotherboardById(req.params.id, function(err, motherboards) {
        if(err) {
            res.send("error");
            console.log(err);
        }
        console.log('get mobo by id');
        res.send(motherboards);
    });
}