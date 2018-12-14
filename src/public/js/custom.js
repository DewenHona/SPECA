const Components = {}

function loadComponent(apiname, text_attributes) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            Components[apiname] = JSON.parse(this.responseText)
            createComponentOptions(apiname, text_attributes);
            //console.table(Components[apiname]);
        }
    };
    xhttp.open("GET", "/api/components/"+apiname, true);
    xhttp.send();
}

function createComponentOptions(apiname, text_attributes) {
    var select = document.getElementById(apiname+'-selector');
    for (var i = 0; i < Components[apiname].length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", (i+1));
        let name = '';
        text_attributes.forEach(key => {
            if(name !== '')
                name +="-"
            name += Components[apiname][i][key];
        });
        var model = document.createTextNode(name);
        option.appendChild(model);
        select.appendChild(option);
    }
}

const config = {
    processors: ['p_model'],
    motherboards: ['m_name'],
    graphics: ['g_model','g_vram'],
    ram: ['r_brand','r_model','r_speed','r_capacity'],
    psu: ['psu_brand','psu_model','psu_rating','psu_modular'],
    cooling: ['cooler_brand','cooler_model'],
    storage: ['s_type','s_brand','s_model','s_capacity'],
    display: ['disp_resolution','disp_refresh_rate','disp_size_type','disp_panel_type'],
    case: ['c_brand','c_model','c_form_factor']
}

function load() {
    for(key in config)
        loadComponent(key, config[key]);
}

window.onload = () => { if(sessionStorage.token) load();}

///////////////////////////////////////////////////////////////////////////
/*
var processors;
var motherboards;
var graphics;

function loadAllProcessors() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            processors = JSON.parse(this.responseText)
            createProcessorOptions(processors)
        }
    };
    xhttp.open("GET", "/api/components/processors", true);
    xhttp.send();
}

function loadAllMotherboards() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            motherboards = JSON.parse(this.responseText)
            createMotherboardOptions(motherboards)
        }
    };
    xhttp.open("GET", "/api/components/motherboards", true);
    xhttp.send();
}

function loadAllGraphics() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            graphics = JSON.parse(this.responseText)
            createGraphicOptions(graphics)
        }
    };
    xhttp.open("GET", "/api/components/graphics", true);
    xhttp.send();
}


function createProcessorOptions(processors) {
    var select = document.getElementById('processor-selector');
    for (var i = 0; i < processors.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", processors[i].p_model);
        var model = document.createTextNode(`${processors[i].p_brand}-${processors[i].p_model}`);
        option.appendChild(model);
        select.appendChild(option);
    }
}

function createMotherboardOptions(motherboards) {
    var select = document.getElementById('motherboard-selector');
    for (var i = 0; i < motherboards.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", motherboards[i].m_name);
        var name = document.createTextNode(motherboards[i].m_name);
        option.appendChild(name);
        select.appendChild(option);
    }
}

function createGraphicOptions(graphics) {
    var select = document.getElementById('graphics-selector');
    for (var i = 0; i < graphics.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", graphics[i].g_model);
        var name = document.createTextNode(
            `${graphics[i].g_make}-${graphics[i].g_model}-${graphics[i].g_vram}`
        );
        option.appendChild(name);
        select.appendChild(option);
    }
}

function load() {
    loadAllProcessors();
    loadAllMotherboards();
    loadAllGraphics()
}*/