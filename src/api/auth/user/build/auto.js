exports.getAutoBuild = function(req, res) {
    const obj = {
        "name" : req['speca_user_name'],
        "body" : req.body
    }
    console.log(obj)
    res.send(obj);
}