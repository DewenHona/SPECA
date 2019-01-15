var Builds = [];

window.onload = function () {
    fetchBuilds();
    fetchBookmarks(function(bk) {
        Bookmarks = bk
        console.log(Bookmarks)
        bookmarksFetched();
    })
}


function fetchBuilds() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            Builds = JSON.parse(this.responseText);
            console.log(Builds)
            displayAllBuilds();
        }
    };
    xhttp.open("GET", "/api/users/"+sessionStorage.getItem('name')+"/builds/complete", true);
    xhttp.setRequestHeader('Authorization', sessionStorage.token);
    xhttp.send();
}


function displayAllBuilds() {
    for (var i = Builds.length - 1; i >= 0; i--) {
        displayBuild(i);
    }
}

function displayBuild(i) {
    var container = document.getElementsByClassName("build-acc-container")[0]
    var tableStart = document.createElement("div");
    tableStart.setAttribute('class', 'table-start');
    var buildTable = document.createElement("table");
    var tr = buildTable.insertRow();
    var th = document.createElement('th');
    th.innerHTML = "Build Name ";
    tr.appendChild(th);
    th = document.createElement('th');
    th.innerHTML = Builds[i].B_Title;
    tr.appendChild(th);
    tr = buildTable.insertRow();
    th = document.createElement('th');
    th.innerHTML = "Component";
    tr.appendChild(th);
    th = document.createElement('th');
    th.innerHTML = "Model"
    tr.appendChild(th);
    for (k in Builds[i]) {
        addRow(i, buildTable, k);
    }
    tableStart.appendChild(buildTable);
    container.appendChild(tableStart);

    var butDiv = document.createElement('div');
    butDiv.setAttribute('class', 'dash-but-div');

    var deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'dash-del');
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = function () {
        deleteBuild(Builds[i].B_Id);
    }

    var customButton = document.createElement('button');
    customButton.setAttribute('class', 'dash-edit');
    customButton.innerHTML = "Edit Build";
    customButton.onclick = function () {
        customizeBuild(i);
    }
    var requestButton = document.createElement('button');
    requestButton.setAttribute('class', 'dash-edit');
    if(parseInt(Builds[i].B_Requested)) {
        requestButton.innerHTML = "View Request";
        requestButton.onclick = function() {
            window.location.href = `/merchant/requests.html?merchant=${Builds[i].B_Merchant}`;
        }
    } else {
        requestButton.innerHTML = "Request build";
        requestButton.onclick = function() {
            window.location.href = `/merchant/all.html?id=${Builds[i].B_Id}&name=${sessionStorage.name}`;
        }
    }
    butDiv.appendChild(requestButton);  
    butDiv.appendChild(customButton);
    butDiv.appendChild(deleteButton);
    container.appendChild(butDiv);
}

function addRow(i, table, k) {
    var row = table.insertRow();
    var td = row.insertCell();
    td.innerHTML = k;
    td = row.insertCell();
    td.innerHTML = Builds[i][k];
}

function deleteBuild(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            console.log(result);
            if (result.success) {
                window.location.reload();
            }
        }
    };
    xhttp.open("DELETE", "/api/users/"+sessionStorage.name +"/builds/" + id, true);
    xhttp.setRequestHeader('Authorization', sessionStorage.token);
    xhttp.send();
}


const buildToCustom = {
    processors: ['p_id'],
    motherboards: ['m_id'],
    graphics: ['g_id'],
    ram: ['r_id'],
    psu: ['psu_id'],
    cooling: ['cooler_id'],
    ssd: ['s_id'],
    hdd: ['s_id'],
    display: ['disp_id'],
    case: ['c_id']
}

function customizeBuild(b) {
    fetch("/api/users/"+sessionStorage.name +"/builds/" + Builds[b].B_Id,{
        headers: {'Authorization': sessionStorage.token}
    })
    .then((res) => {
        console.log(res)
        return res.json()
    })
    .then((json)=>{
        console.log(json)
        let CopyBuild = {};
        for (k in buildToCustom) {
            var prop = k == 'case' ? 'ccase' : k;
            CopyBuild[k] = json[prop];   
        }
        console.log(CopyBuild);
        const customize = {
            id: Builds[b].B_Id,
            name: Builds[b].B_Title,
            build: CopyBuild
        };
        sessionStorage.setItem('customize', JSON.stringify(customize));
        console.log(JSON.parse(sessionStorage.customize));
        window.location.href = '/custom.html';
    })
    .catch((err)=>{
        console.log(err)
    })
}

/// bookamrks

var Bookmarks

const bkmrkConfig = {
    //  format is ->
    //  <api> : [<primary key>[<coloumn names>]]
    //  dont edit this without asking 0ya-sh0
    processor: ['Processor','p_id', ['p_brand', 'p_model']],
    motherboard: ['Motherboard','m_id', ['m_name']],
    graphics_card: ['Graphics card', 'g_id',['g_model', 'g_vram']],
    ram: ['Memory','r_id', ['r_brand', 'r_model', 'r_speed', 'r_capacity']],
    psu: ['Power supply','psu_id', ['psu_brand', 'psu_model', 'psu_rating', 'psu_modular']],
    cooling_solution: ['Cooling', 'cooler_id',['cooler_brand', 'cooler_model']],
    ssd: ['SSD', 's_id',['s_type', 's_brand', 's_model', 's_capacity']],
    hdd: ['HDD','s_id', ['s_type', 's_brand', 's_model', 's_capacity']],
    display: ['Display','disp_id', ['disp_resolution', 'disp_refresh_rate', 'disp_size_type', 'disp_panel_type']],
    cpu_case: ['Case', 'c_id',['c_brand', 'c_model', 'c_form_factor']]
}

function bookmarksFetched () {
    var parentDiv = document.getElementById('bookmarks');
    var results = Bookmarks.result
    for(var i=0; i<results.length; i++) {
        var childDiv = document.createElement('div');
        childDiv.setAttribute('class', 'saved-part');

        var ltn = document.createElement('label');
        ltn.setAttribute('class', 'part-label-type');
        const tname = results[i].type.name;
        ltn.innerHTML = bkmrkConfig[tname][0];
        childDiv.appendChild(ltn);
        var ln = document.createElement('label');
        ln.setAttribute('class', 'part-label-name');
        var name = '';
        bkmrkConfig[tname][2].forEach(element => {
            name += results[i].obj[element] + " "
        });
        ln.innerHTML = name;
        childDiv.appendChild(document.createElement('br'))
        childDiv.appendChild(ln);
        var btn = document.createElement('button');
        btn.setAttribute('class', 'part-delete');
        btn.innerHTML = 'Remove';
        const partObj = results[i]
        btn.onclick = function() {
            deleteBookmark(partObj.type.id, partObj.obj[bkmrkConfig[tname][1]])
        }
        childDiv.appendChild(document.createElement('br'))
        childDiv.appendChild(btn)
        parentDiv.appendChild(childDiv)
    }
}

/*const config = {
    //  format is ->
    //  <api> : [<primary key>[<coloumn names>]]
    //  dont edit this without asking 0ya-sh0
    processors: ['Processor', ['p_brand', 'p_model']],
    motherboards: ['Motherboard', ['m_name']],
    graphics: ['Graphics card', ['g_model', 'g_vram']],
    ram: ['Memory', ['r_brand', 'r_model', 'r_speed', 'r_capacity']],
    psu: ['Power supply', ['psu_brand', 'psu_model', 'psu_rating', 'psu_modular']],
    cooling: ['Cooling', ['cooler_brand', 'cooler_model']],
    ssd: ['SSD', ['s_type', 's_brand', 's_model', 's_capacity']],
    hdd: ['HDD', ['s_type', 's_brand', 's_model', 's_capacity']],
    display: ['Display', ['disp_resolution', 'disp_refresh_rate', 'disp_size_type', 'disp_panel_type']],
    case: ['Case', ['c_brand', 'c_model', 'c_form_factor']]
}
 */