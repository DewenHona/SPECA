const Storage = require('../models/hdd.model');

exports.get_all_storage = function(req, res) {
    Storage.getAllStorage(function(err, storage) {
        if(err) 
            res.send(err);
        console.log('res', storage);
        res.send(storage);
    });
}

exports.get_storage_by_id = function(req, res) {
    Storage.getStorageById(req.params.id, function(err, storage) {
        if(err) 
            res.send(err);
        console.log('res', storage);
        res.send(storage);
    });
}