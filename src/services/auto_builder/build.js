const questions = require('../../config/config.questions');
const purposeModel = require('./purpose'); 
const displayModel = require('../../api/components/display/display.model')
const disp_gpuModel = require('./display_gpu');
const purpose_cpuModel = require('./purpose_cpu');
const processor_moboModel = require('./processor_motherboard');
const ccaseModel = require('../../api/components/ccase/ccase.model');
const purpose_ramModel = require('./purpose_ram');
const purpose_gpuModel = require('./purpose_gpu');
const purpose_storageModel = require('./purp_res_storage');
const cpu_psuModel = require('./cpu_psu');
const cpu_coolingModel = require('./cpu_cooling');

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
    const storage = await purpose_storageModel.getStorageIdByPIdAndRes(purposeId, resolution);
    const psuID = await cpu_psuModel.getPsuIdByCpuId(cpuId);
    const coolerID = await cpu_coolingModel.getCoolerIdByCpuId(cpuId);
    const retObj = {
        processors: cpuId,
        motherboards: moboID,
        graphics: gpuId,
        ram: ramID,
        display: displayId,
        case: caseID, 
        ssd: storage.s_id,
        hdd: storage.h_id,
        psu: psuID,
        cooling: coolerID
    }
    console.log(retObj)
    clbk(false,retObj);
}

const gamingBuild = async(obj, p, clbk) => {
    const subcatQID = 2;
    const subcat = questions[subcatQID].options[obj.body[subcatQID]].key;
    const fullname = p+"_"+subcat;
    const purposeId = await purposeModel.getPurposeByName(fullname);
    const ramID = await purpose_ramModel.getRamIdByPId(purposeId);
    const resQID = 4;
    const resolution = questions[resQID].options[obj.body[resQID]].key;
    const rate = rate_purpose_map[p];
    const displayId = await displayModel.getDisplayIdByResoluionAndRate(resolution, rate);
    const gpu_r_id = parseInt(obj.body[subcatQID])*3+1 + parseInt(obj.body[resQID]);
    const gpuId = await purpose_gpuModel.getGpuIdByRId(gpu_r_id);
    const ocQID = 5;
    const streamQID = 6;
    const cpu_r_id = 13 + (questions[ocQID].options[obj.body[ocQID]].key)*2 + (questions[streamQID].options[obj.body[streamQID]].key);
    const cpuId = await purpose_cpuModel.getCpuIdByRId(cpu_r_id);
    const sizeQID = 7;
    const size = questions[sizeQID].options[obj.body[sizeQID]].key;
    const moboID = await processor_moboModel.getMoboIDByCpuAndSize(cpuId, size);
    const caseID = await ccaseModel.getCaseBySize(size);
    const storage = await purpose_storageModel.getStorageIdByPIdAndRes(purposeId, resolution);
    const psuID = await cpu_psuModel.getPsuIdByCpuId(cpuId);
    const coolerID = await cpu_coolingModel.getCoolerIdByCpuId(cpuId);
    const retObj = {
        processors: cpuId,
        motherboards: moboID,
        graphics: gpuId,
        ram: ramID,
        display: displayId,
        case: caseID, 
        ssd: storage.s_id,
        hdd: storage.h_id,
        psu: psuID,
        cooling: coolerID
    }
    console.log(retObj)
    clbk(false,retObj);

}

const developementBuild = async(obj, p, clbk) => {
    const subcatQID = 3;
    const subcat = questions[subcatQID].options[obj.body[subcatQID]].key;
    const fullname = p+"_"+subcat;
    const purposeId = await purposeModel.getPurposeByName(fullname);
    const ramID = await purpose_ramModel.getRamIdByPId(purposeId);
    const resQID = 10;
    const resolution = questions[resQID].options[obj.body[resQID]].key;
    const rate = rate_purpose_map[p];
    const displayId = await displayModel.getDisplayIdByResoluionAndRate(resolution, rate);
    const gpu_r_id = 7 + parseInt(obj.body[subcatQID])*3 + parseInt(obj.body[resQID]);
    const gpuId = await purpose_gpuModel.getGpuIdByRId(gpu_r_id);
    const ocQID = 11;
    const cpu_r_id = 21 + parseInt(obj.body[subcatQID])*2 + (questions[ocQID].options[obj.body[ocQID]].key);
    const cpuId = await purpose_cpuModel.getCpuIdByRId(cpu_r_id);
    const sizeQID = 7;
    const size = questions[sizeQID].options[obj.body[sizeQID]].key;
    const moboID = await processor_moboModel.getMoboIDByCpuAndSize(cpuId, size);
    const caseID = await ccaseModel.getCaseBySize(size);
    const storage = await purpose_storageModel.getStorageIdByPIdAndRes(purposeId, resolution);
    const psuID = await cpu_psuModel.getPsuIdByCpuId(cpuId);
    const coolerID = await cpu_coolingModel.getCoolerIdByCpuId(cpuId);
    const retObj = {
        processors: cpuId,
        motherboards: moboID,
        graphics: gpuId,
        ram: ramID,
        display: displayId,
        case: caseID, 
        ssd: storage.s_id,
        hdd: storage.h_id,
        psu: psuID,
        cooling: coolerID
    }
    console.log(retObj)
    clbk(false,retObj);
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

