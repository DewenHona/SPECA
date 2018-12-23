exports.getAutoBuild = function(req, res) {
    const obj = {
        "name" : req['speca_user_name'],
        "body" : req.body
    }
    console.log(obj)
    res.send(obj);
}

exports.getQuestions = function(req, res) {
    const questions = require('../../../../config/config.questions');
    console.log("get all questions");
    res.send(questions);
}