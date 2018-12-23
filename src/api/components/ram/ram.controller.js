const ram = require('./ram.model');

exports.get_all_rams = function(req, res) {
    ram.getAllRams(function(err, rams) {
        if(err) {
            res.send("error");
            console.log(err);
        }
        console.log('get all ram');
        res.send(rams);
    });
}

exports.get_ram_by_id = function(req, res) {
    ram.getRamById(req.params.id, function(err, rams) {
        if(err) {
            res.send("error");
            console.log(err);
        }
        console.log('get ram by id');
        res.send(rams);
    });
}