exports.getAutoBuild = function(req, res) {
    const obj = {
        "name" : req['speca_user_name'],
        "body" : req.body
    }
    console.log(obj);
    const builder = require('../../../../services/auto_builder/build');
    builder.build(obj, (err, result) => {
        if(err) {
            console.log(err);
            res.send("error");
        } else {
            res.send(result);
        }
    })
}

exports.getQuestions = function(req, res) {
    const questions = require('../../../../config/config.questions');
    console.log("get all questions");
    res.send(questions);
}