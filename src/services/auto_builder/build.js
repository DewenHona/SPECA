const questions = require('../../config/config.questions');
const purposeModel = require('./purpose'); 
const displayModel = require('../../api/components/display/display.model')
const disp_gpuModel = require('./display_gpu');
const purpose_cpuModel = require('./purpose_cpu');
const processor_moboModel = require('./processor_motherboard');
const ccaseModel = require('../../api/components/ccase/ccase.model');
const purpose_ramModel = require('./purpose_ram');

const rate_purpose_map = {
    "Editing" : "120 Hz",
    "Gaming" : "144 Hz",
    "Developement" : "60 Hz"
}

const editingBuild = async (obj, p, clbk) => {
    const subcatQID = questions[0].options[obj.body[0]].question;
    const subcat = questions[subcatQID].options[obj.body[subcatQID]].key;
    const fullname = p+'_'+subcat;
    const purposeId = await purposeModel.getPurposeByName(fullname);
    const resQID = questions[subcatQID].options[obj.body[subcatQID]].question;
    const resolution = questions[resQID].options[obj.body[resQID]].key;
    const rate = rate_purpose_map[p];
    const displayId = await displayModel.getDisplayIdByResoluionAndRate(resolution, rate);
    const gpuId = await disp_gpuModel.getGpuIdByDispId(displayId);
    const scaleQID = questions[resQID].options[obj.body[resQID]].question;
    const cpu_r_id = (parseInt(obj.body[resQID])*2 + 1) + parseInt(obj.body[scaleQID]) + parseInt(obj.body[subcatQID])*6
    const cpuId = await purpose_cpuModel.getCpuIdByRId(cpu_r_id);
    const sizeQID = questions[scaleQID].options[obj.body[scaleQID]].question;
    const size = questions[sizeQID].options[obj.body[sizeQID]].key;
    const moboID = await processor_moboModel.getMoboIDByCpuAndSize(cpuId, size);
    const caseID = await ccaseModel.getCaseBySize(size);
    const ram_r_id = (parseInt(obj.body[resQID])*2 + 1) + parseInt(obj.body[scaleQID]) + parseInt(obj.body[subcatQID])*6
    const ramID = await purpose_ramModel.getRamIdByRId(ram_r_id);
    const retObj = {
        processors: cpuId,
        motherboards: moboID,
        graphics: gpuId,
        ram: ramID,
        display: displayId,
        case: caseID, 
        ssd: 1,
        hdd: 1,
        psu: 1,
        cooling: 1
    }
    clbk(false,retObj);
}

const gamingBuild = (obj, p, clbk) => {
    clbk(false,{p});

}

const developementBuild = (obj, p, clbk) => {
    clbk(false,{p});
}

const purpose_func_map = {
    "Editing" : editingBuild,
    "Gaming" : gamingBuild,
    "Developement" : developementBuild,
}



exports.build = (obj, clbk) => {
    const p = questions[0].options[obj.body[0]].key
    purpose_func_map[p](obj, p, clbk);
}

