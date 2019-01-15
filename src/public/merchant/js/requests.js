var isMerchant = true;
var um_name;
var urBuilds = {};
var CopyBuilds = {};

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
    return null;
}

window.onload = function() {
    if(getQueryVariable('merchant')) {
        um_name = getQueryVariable('merchant');
        isMerchant = false;
        loadRequestedBuilds(loadPartIDS);
        document.getElementById('message').innerHTML = `Welcome user : ${sessionStorage.name} <br>
        here are your requested builds to merchant ${um_name}`
    } else if(sessionStorage.mtoken) {
        isMerchant = true;
        document.getElementById('message').innerHTML = `Welcome merchant : ${sessionStorage.mname} <br>
        here are your all requests`
        loadRequestedBuilds(loadPartIDS);
    } else {
        window.location.href='/merchant/login.html';
    }
}

function loadRequestedBuilds(clbk) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            urBuilds = JSON.parse(this.responseText);
            CopyBuilds = JSON.parse(this.responseText);
            console.log(urBuilds);
            clbk()
        };
    }
    if(isMerchant) {
        xhttp.open("GET", "/api/merchants/"+sessionStorage.mname+"/builds", true);
        xhttp.setRequestHeader('Authorization', sessionStorage.mtoken);
    } else {
        xhttp.open("GET", "/api/merchants/"+um_name+"/builds", true);
        xhttp.setRequestHeader('Authorization', sessionStorage.token);
    }
    xhttp.send(); 
}

function loadPartIDS() {
    for(let i=0; i<urBuilds.length; i++) {
        loadPartID(i,urBuilds[i].b_id);
    }
}

function loadPartID(i, bid) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            urBuilds[i].b_id = JSON.parse(this.responseText);
            displayBuild(i);
        }
    };
    if(isMerchant) {
        xhttp.open("GET", "/api/users/"+urBuilds[i].u_name+"/builds/"+bid+"/complete", true);
        xhttp.setRequestHeader('Authorization', sessionStorage.mtoken);
    } else {
        xhttp.open("GET", "/api/users/"+sessionStorage.name+"/builds/"+bid+"/complete", true);
        xhttp.setRequestHeader('Authorization', sessionStorage.token);
    }
    xhttp.send();
}

function displayBuild(i) {
    var container = document.getElementsByClassName("build-acc-container")[0]
    var tableStart = document.createElement("div");
    tableStart.setAttribute('class', 'table-start');
    var buildTable = document.createElement("table");

    var tr = buildTable.insertRow();
    var th = document.createElement('th');
    th.innerHTML = "Client Name";
    tr.appendChild(th);
    th = document.createElement('th');
    th.innerHTML = urBuilds[i].u_name;
    tr.appendChild(th);

    tr = buildTable.insertRow();
    th = document.createElement('th');
    th.innerHTML = "Title";
    tr.appendChild(th);
    th = document.createElement('th');
    th.innerHTML = urBuilds[i].b_id.B_Title;
    tr.appendChild(th);

    tr = buildTable.insertRow();
    th = document.createElement('th');
    th.innerHTML = "Component";
    tr.appendChild(th);
    th = document.createElement('th');
    th.innerHTML = "Model"
    tr.appendChild(th);

    for (k in urBuilds[i].b_id) {
        addRow(i, buildTable, k);
    }
    tableStart.appendChild(buildTable);
    container.appendChild(tableStart);
}

function addRow(i, table, k) {
    var row = table.insertRow();
    var td = row.insertCell();
    td.innerHTML = k;
    td = row.insertCell();
    td.innerHTML = urBuilds[i].b_id[k];
}

/*

keep this for reference

const config = {
    processors: ["Processor",'p_id', ['p_model']],
    motherboards: ["Motherboard",'m_id', ['m_name']],
    graphics: ["Graphics",'g_id', ['g_model', 'g_vram']],
    ram: ["Ram",'r_id', ['r_brand', 'r_model', 'r_speed', 'r_capacity']],
    psu: ["Power supply",'psu_id', ['psu_brand', 'psu_model', 'psu_rating', 'psu_modular']],
    cooling: ["Cooling",'cooler_id', ['cooler_brand', 'cooler_model']],
    ssd: ["SSD",'s_id', ['s_type', 's_brand', 's_model', 's_capacity']],
    hdd: ["HDD",'s_id', ['s_type', 's_brand', 's_model', 's_capacity']],
    display: ["Display",'disp_id', ['disp_resolution', 'disp_refresh_rate', 'disp_size_type', 'disp_panel_type']],
    case: ["Case",'c_id', ['c_brand', 'c_model', 'c_form_factor']]
}

*/