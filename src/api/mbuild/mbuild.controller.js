const Mbuild = require('./mbuild.model')
const Build = require('../build/build.model')
const Merchant = require('../merchant/merchant.model')

exports.createRequest = async function(req, res) {
    if (req['speca_user_name']) {
        const uname = req['speca_user_name'];
        console.log(req.body);
        console.log(req.params)
        try {
            await getMerchantByName(req.params.name);
            const build = await Build.getBuildById(req.body.id);
            if (build[0].u_name === uname) {
                await Mbuild.insert(req.params.name, req.body.id, uname ,req.body.contact)
                await Build.updateRequest(req.body.id, true, req.params.name)
                res.send(req.body)          
            } else {
                console.log("not your build")
                res.status(404).send("not your build");
            }
        } catch (error) {
            console.log(error)
            res.status(500).send();
        }
    } else {
        console.log("merchant cant post rn")
        res.status(500).send("merchant cant post rn");
    }
}

var getMerchantByName = async function(name) {
    const m = await Merchant.getUserByUserNameAsync(name);
    return m[0].firm;
}

exports.getMBuilds = async function(req, res) {
    if(req['speca_merchant_name'] === req.params.name) {
        const mb = await Mbuild.getMbuildsByMname(req.params.name);
        res.send(mb);
    } else {
        const mb = await Mbuild.getMbuildsByMnameAndUname(req.params.name, req['speca_user_name']);
        res.send(mb);
    }
}