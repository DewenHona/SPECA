var processors;
var motherboards;

function loadAllProcessors() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
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
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            motherboards = JSON.parse(this.responseText)
            createMotherboardOptions(motherboards)
        }
    };
    xhttp.open("GET", "/api/components/motherboards", true);
    xhttp.send();
}

function createProcessorOptions(processors) {
    var select = document.getElementById('processor-selector');
    for(var i=0; i<processors.length; i++) {       
        var option = document.createElement("option");
        option.setAttribute("value", processors[i].p_model);
        var model = document.createTextNode(processors[i].p_model);
        option.appendChild(model);
        select.appendChild(option);
    }
}

function createMotherboardOptions(motherboards) {
    var select = document.getElementById('motherboard-selector');
    for(var i=0; i<motherboards.length; i++) {       
        var option = document.createElement("option");
        option.setAttribute("value", motherboards[i].m_name);
        var name = document.createTextNode(motherboards[i].m_name);
        option.appendChild(name);
        select.appendChild(option);
    }
}

window.onload = function() {
    loadAllProcessors();
    loadAllMotherboards();
};