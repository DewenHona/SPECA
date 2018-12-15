var Builds = [];
var Count;
var Total;

window.onload = fetchBuilds();


function fetchBuilds() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            Builds = JSON.parse(this.responseText);
            console.log(Builds)
            Total = Builds.length*9;
            Count = 0;
            for(var i = 0; i<Builds.length; i++) {
                var k = Object.keys(config);
                for(z of k) {
                    var x = z=='case'?'ccase':z;
                    fetchComponent(i,z,Builds[i][x], fetchCompleted);
                }
            }
        }
    };
    xhttp.open("GET", "/api/me", true);
    xhttp.setRequestHeader('Authorization', sessionStorage.token);
    xhttp.send();
}

function fetchComponent(i,name, id, cb) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            Count++;
            var n = name == 'case'?'ccase':name;
            Builds[i][n] = JSON.parse(this.responseText)[0];    
            if(Total <= Count)
                cb();
        }
    };
    xhttp.open("GET", "/api/components/"+name+"/"+id, true);
    xhttp.send();
}


function fetchCompleted() {
    console.log("completed");
    displayAllBuilds();
} 

function displayAllBuilds() {
    for(var i = Builds.length-1; i>=0; i--) {
        displayBuild(i);
    }
}

const config = {
    //  format is ->
    //  <api> : [<primary key>[<coloumn names>]]
    //  dont edit this without asking 0ya-sh0
    processors: ['Processor',['p_brand','p_model']],
    motherboards: ['Motherboard',['m_name']],
    graphics: ['Graphics card',['g_model','g_vram']],
    ram: ['Memory',['r_brand','r_model','r_speed','r_capacity']],
    psu: ['Power supply',['psu_brand','psu_model','psu_rating','psu_modular']],
    cooling: ['Cooling',['cooler_brand','cooler_model']],
    storage: ['Storage',['s_type','s_brand','s_model','s_capacity']],
    display: ['Display',['disp_resolution','disp_refresh_rate','disp_size_type','disp_panel_type']],
    case: ['Case',['c_brand','c_model','c_form_factor']]
}

function displayBuild(i) {
    var container = document.getElementsByClassName("build-acc-container")[0]
    var tableStart = document.createElement("div");
    tableStart.setAttribute('class','table-start');
    var buildTable = document.createElement("table");
    var tr = buildTable.insertRow();
    var th = document.createElement('th');
    th.innerHTML = "Component";
    tr.appendChild(th);
    th = document.createElement('th');
    th.innerHTML = "Model"
    tr.appendChild(th);
    for(k in config) {
        addRow(i,buildTable,k);
    }
    tableStart.appendChild(buildTable);
    container.appendChild(tableStart);
}

function addRow(i,table, k) {
    var row = table.insertRow();
    var td = row.insertCell();
    td.innerHTML = config[k][0];
    td = row.insertCell();
    td.innerHTML = generateModelName(i,k); 
}

function generateModelName(i,k) {
    var name = ''
    var properties = config[k][1];
    properties.forEach(property => {
         k = k == 'case'? 'ccase': k;
        name += Builds[i][k][property] + ' ';
    });
    return name;
}