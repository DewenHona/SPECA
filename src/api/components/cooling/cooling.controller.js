const Cooling = require('./cooling.model');

exports.get_all_cooling = function(req, res) {
    Cooling.getAllCooling(function(err, cooling) {
        if(err) {
            res.send("error");
            console.log(err);
        }
        console.log('get all cooling');
        res.send(cooling);
    });
}

exports.get_cooling_by_id = function(req, res) {
    Cooling.getCoolingById(req.params.id, function(err, cooling) {
        if(err) {
            res.send("error");
            console.log(err);
        }
        console.log('get cooling by id')
        res.send(cooling);
    });
}