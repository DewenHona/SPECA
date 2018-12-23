const sql = require('../../../services/db');

/*
 (disp_id int(100) NOT NULL AUTO_INCREMENT,
 disp_resolution varchar(100) COLLATE utf8_unicode_ci NOT NULL, 
 disp_refresh_rate varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 disp_size_type varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 disp_panel_type varchar(100) COLLATE utf8_unicode_ci NOT NULL
*/

const Display = function(id, resolution, refresh_rate, size_type, panel_type) {
    this.id = id;
    this.resolution = resolution;
    this.refresh_rate = refresh_rate;
    this.size_type = size_type;
    this.panel_type = panel_type;
}

Display.getAllDisplay = function(result) {
    sql.query('Select * from display', function(err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            //console.log('tasks : ', res);  
            result(null, res);
        }
    });
}

Display.getDisplayById = function(id, result) {
    sql.query(`Select * from display where disp_id = ${id}`, function(err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            //console.log('tasks : ', res);  
            result(null, res);
        }
    });
}

module.exports = Display;