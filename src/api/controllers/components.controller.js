'use strict';

const Component = require('../models/components.model');

exports.get_all_components = function(req, res) {
    Component.getAllComponents(function(err, component) {
        console.log('controller')
        if (err)
          res.send(err);
          console.log('res', component);
        res.send(component);
      });
}
