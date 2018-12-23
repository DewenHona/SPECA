'use strict';

const Processor = require('./processors.model');

exports.get_all_processors = function(req, res) {
    Processor.getAllProcessors(function(err, processor) {
        console.log('controller')
        if (err)
            res.send(err);
            console.log('res', processor);
        res.send(processor);
    });
}

exports.get_processor_by_id = function(req, res) {
    Processor.getProcessorById(req.params.id, function(err, processor) {
        if (err)
            res.send(err);
            console.log('res', processor);
        res.send(processor);
    });
}