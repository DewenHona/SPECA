const Display = require('./display.model');

exports.get_all_display = function(req, res) {
    Display.getAllDisplay(function(err, display) {
        if(err) 
            res.send(err);
        console.log('res', display);
        res.send(display);
    });
}

exports.get_display_by_id = function(req, res) {
    Display.getDisplayById(req.params.id, function(err, display) {
        if(err) 
            res.send(err);
        console.log('res', display);
        res.send(display);
    });
}