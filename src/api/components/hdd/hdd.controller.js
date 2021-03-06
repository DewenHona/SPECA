const Storage = require('./hdd.model');

exports.get_all_storage = function(req, res) {
    Storage.getAllStorage(function(err, storage) {
        if(err) {
            res.send("error");
            console.log(err);
        }
        console.log('get all hdd');
        res.send(storage);
    });
}

exports.get_storage_by_id = function(req, res) {
    Storage.getStorageById(req.params.id, function(err, storage) {
        if(err) {
            res.send("error");
            console.log(err);
        }
        console.log('get hdd by id');
        res.send(storage);
    });
}