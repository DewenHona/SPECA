const model = require('./bookmarks.model')

exports.getAllBookmarks = async function(req, res) {
    try {
        const name = req['speca_user_name'];
        const bkmrks = await model.getAllBookmarksByName(name);
        res.send({result : bkmrks})
    } catch (error) {
        res.send();
        console.log(error)
    }
}

exports.postBookmark = async function(req, res) {
    try {
        const name = req['speca_user_name'];
        const result = await model.postBookmark(name, req.body.type, req.body.id)
        res.send({success:result})
    } catch (error) {
        res.send({success:false});
        console.log(error)
    }
}