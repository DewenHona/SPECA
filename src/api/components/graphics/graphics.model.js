const sql = require('../../../services/db');

/*
    g_id int(100) NOT NULL AUTO_INCREMENT,
    g_make varchar(100) COLLATE utf8_unicode_ci NOT NULL,
    g_brand varchar(100) COLLATE utf8_unicode_ci NOT NULL,
    g_model varchar(100) COLLATE utf8_unicode_ci NOT NULL, 
    g_vram varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 PRIMARY KEY (g_id))
*/

const Graphics = function(id, make, brand, model, vram) {
    this.id = id;
    this.make = make;
    this.brand = brand;
    this.model = model;
    this.vram = vram;
}

Graphics.getAllGraphics = function(result) {
    sql.query('Select * from graphics_card', function(err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('tasks : ', res);  
            result(null, res);
        }
    });
}

Graphics.getGraphicById = function(id, result) {
    sql.query(`Select * from graphics_card where g_id = ${id}`, function(err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('tasks : ', res);  
            result(null, res);
        }
    });
}

module.exports = Graphics;