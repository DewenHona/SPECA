const Display = require('./display.model');

exports.get_all_display = function(req, res) {
    Display.getAllDisplay(function(err, display) {
        if(err) {
            res.send("error");
            console.log(err);
        }
        console.log('get all display');
        res.send(display);
    });
}

exports.get_display_by_id = function(req, res) {
    Display.getDisplayById(req.params.id, function(err, display) {
        if(err) {
            res.send("error");
            console.log(err);
        }
        console.log('get display by id');
        res.send(display);
    });
}