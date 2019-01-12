var Merchants;
var Build = {}

window.onload = () => {
    loadAllMerchants(merchantsLoaded);
}

function loadAllMerchants(clbk) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            Merchants = JSON.parse(this.responseText);
            console.log(Merchants);
            clbk()
        };
    }
    xhttp.open("GET", "/api/merchants", true);
    xhttp.send(); 
}

function merchantsLoaded() {
    Build.id = getQueryVariable('id');
    Build.name = getQueryVariable('name');
    displayMerchants(Build.id && Build.name);
}

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

function displayMerchants(toShowBtn) {
    let m = Merchants.result;
    var pdiv = document.getElementById('merchant-table-container');
    var table = document.createElement('table');
    for (let i=0; i<m.length;i++) {
        var row = table.insertRow();
        var cell = row.insertCell();
        cell.innerHTML = m[i].name;
        cell = row.insertCell();
        cell.innerHTML = m[i].firm;
        if(toShowBtn) {
            var button = document.createElement('button');
            button.innerHTML = "Request Build";
            row.insertCell().appendChild(button);
        }
    }
    pdiv.appendChild(table)
}