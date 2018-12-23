const Ccase = require('./ccase.model');

exports.get_all_ccase = function(req, res) {
    Ccase.getAllCcase(function(err, ccase) {
        if(err) {
            res.send("error");
            console.log(err);
        } 
        console.log(`get all case`);
        res.send(ccase);
    });
}

exports.get_ccase_by_id = function(req, res) {
    Ccase.getCcaseById(req.params.id, function(err, ccase) {
        if(err) {
            res.send("error");
            console.log(err);
        }
        console.log("get case by id");
        res.send(ccase);
    });
}