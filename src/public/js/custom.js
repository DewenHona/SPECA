var processors;

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

function createProcessorOptions(processors) {
    var select = document.getElementById('processor-selector');
    for (var i = 0; i < processors.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", processors[i].p_model);
        var model = document.createTextNode(processors[i].p_model);
        option.appendChild(model);
        select.appendChild(option);
    }
}

window.onload = function () {
    loadAllProcessors();
};