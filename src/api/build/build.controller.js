const Build = require('./build.model')
const Mbuild = require('../mbuild/mbuild.model')

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
        if(str[0]==="title") {
            var i = 3;
            var name = str[2];
            for(;i<str.length;i++) {
                name += " "+ str[i];
            }
            build[str[0]] = name;
        } else {
            build[str[0]] = parseInt(str[2]);
        }
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

exports.delete_build = async function(req, res) {
    const uname = req['speca_user_name'];
    const bid = req.params.id;
    const error = {"success":false};
    const success = {"success":true};
    try {
        const build = await Build.getBuildById(bid);
        if(build) {
            if(build[0].u_name === uname) {
                const result = await Build.deleteBuildById(bid);
                if(result) {
                    console.log('delete build');
                    res.send(success);
                } else {
                    console.log(error);
                    res.send(error);
                }
            } else {
                console.log(error);
                res.send(error);
            }
        } else {
            console.log(error);
            res.send(error);
        }
    } catch (err) {
        console.log(err);
        res.send(error);
    }
}

exports.put_build = async function(req, res) {
    const uname = req['speca_user_name'];
    const bid = req.params.id;
    const error = {"success":false};
    const success = {"success":true};
    try {
        let build = await Build.getBuildById(bid);
        if(build) {
            if(build[0].u_name === uname) {
                build = {};
                const b = req.body;
                for(k in b) {
                    var str = b[k].split(" ");
                    if(str[0]==="title") {
                        var i = 3;
                        var name = str[2];
                        for(;i<str.length;i++) {
                            name += " "+ str[i];
                        }
                        build[str[0]] = name;
                    } else {
                        build[str[0]] = parseInt(str[2]);
                    }
                }
                const result = await Build.putBuildById(bid, build);
                if(result) {
                    console.log('put build');
                    res.send(success);
                } else {
                    console.log(error);
                    res.send(error);
                }
            } else {
                console.log(error);
                res.send(error);
            }
        } else {
            console.log(error);
            res.send(error);
        }
    } catch (err) {
        console.log(err);
        res.send(error);
    }
}

exports.get_build_by_id = async (req, res) => {
    try {
        console.log(req.params)
        const build = await Build.getBuildById(req.params.id);
        if(req['speca_user_name']) {
            if(build[0].u_name === req['speca_user_name']) {
                res.send(build[0])
            } else {
                res.status(404).send();
            }
        } else {
            const mb = await Mbuild.getMbuildById(req.params.id);
            if(mb[0].m_name === req['speca_merchant_name']) {
                res.send(build[0])
            } else {
                res.status(404).send();
            }
        }
    } catch (error) {
        res.status(500).send();
        console.log(error)
    }
    
}