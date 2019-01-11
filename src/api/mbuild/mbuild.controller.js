const Mbuild = require('./mbuild.model')

exports.createRequest = async function(req, res) {
    const mname = req['speca_user_name'];
    console.log(req.body);
    try {
        const result = await Mbuild.insert(req.body.mname, req.body.id, req.body.contact)
        res.send(req.body)
    } catch (error) {
        console.log(error)
        res.status(500).send();
    }
}