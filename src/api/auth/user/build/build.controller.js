const Build = require('./build.model')

exports.get_all_builds_of_user = function(req, res) {
    const name = req['speca_user_name'];
    Build.getAllBuildsOfUser(name, function(err, r) {
        if(err) {
            console.log(err)
            res.send({err:true});
            return;
        }
        res.send(r);
    });
}

exports.insert_build = function(req, res) {
    const build = {};    
    build['u_name'] = req['speca_user_name'];
    const b = req.body;
    for(k in b) {
        var str = b[k].split(" ");
        build[str[0]] = parseInt(str[2]);
    }
    console.log(build);
    
    Build.insertBuild(build, function(err,r) {
        if(err) {
            console.log(err);
            res.send({success:false});
        } else {
            res.send({success:true});
        }
    });
}