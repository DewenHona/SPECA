const Storage = require('./ssd.model');

exports.get_all_storage = function(req, res) {
    Storage.getAllStorage(function(err, storage) {
        if(err) {
            res.send("error");
            console.log(err);
        }
        console.log('get all ssd');
        res.send(storage);
    });
}

exports.get_storage_by_id = function(req, res) {
    Storage.getStorageById(req.params.id, function(err, storage) {
        if(err) {
            res.send("error");
            console.log(err);
        }
        console.log('get ssd by id');
        res.send(storage);
    });
}