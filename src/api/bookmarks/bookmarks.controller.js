const model = require('./bookmarks.model')
const comp = require('../../../components/components.model')

exports.getAllBookmarks = async (req, res) => {
    try {
        const name = req['speca_user_name'];
        const bkmrks = await model.getAllBookmarksByName(name);
        let retobj = []
        for(let i=0; i< bkmrks.length; i++) {
            let {c_name, c_pk} = await comp.getComponentById(bkmrks[i].type);
            const obj = await comp.getComponentByTypeAndId(c_name,c_pk, bkmrks[i].id)
            retobj.push({type:{id : bkmrks[i].type, name : c_name}, obj})
        }
        res.send({result : retobj})
    } catch (error) {
        res.send({result : false});
        console.log(error)
    }
}

exports.postBookmark = async function(req, res) {
    console.log(req.body)
    try {
        const name = req['speca_user_name'];
        const {c_name, c_pk} = await comp.getComponentById(req.body.type);
        const obj = await comp.getComponentByTypeAndId(c_name,c_pk, req.body.id)
        const result = await model.postBookmark(name, req.body.type, req.body.id)
        res.send({success:result,c_name, obj:{obj}})
    } catch (error) {
        res.send({success:false});
        console.log(error)
    }
}

exports.deleteBookmark = async function(req, res) {
    try {
        const name = req['speca_user_name'];
        const result = await model.deleteBookmark(name, req.params.type, req.params.id)
        res.send({success:true})
    } catch (error) {
        res.send({success:false});
        console.log(error)
    }
}