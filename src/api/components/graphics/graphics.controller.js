const graphics = require('./graphics.model');

exports.get_all_graphics = function(req, res) {
    graphics.getAllGraphics(function(err, graphics) {
        if(err) 
            res.send(err);
        console.log('res', graphics);
        res.send(graphics);
    });
}

exports.get_graphic_by_id = function(req, res) {
    graphics.getGraphicById(req.params.id, function(err, graphics) {
        if(err) 
            res.send(err);
        console.log('res', graphics);
        res.send(graphics);
    });
}