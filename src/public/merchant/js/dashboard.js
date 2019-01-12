var isMerchant = true;
var um_name;
var urBuilds = {};

window.onload = function() {
    if(getQueryVariable('um_name')) {
        um_name = getQueryVariable('um_name');
        isMerchant = false;
        loadRequestedBuilds();
    }
}

function loadRequestedBuilds(clbk) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            urBuilds = JSON.parse(this.responseText);
            console.log(urBuilds);
            document.getElementById('op').innerHTML = this.responseText;
            //clbk()
        };
    }
    xhttp.open("GET", "/api/merchants/"+um_name+"/builds", true);
    xhttp.setRequestHeader('Authorization', sessionStorage.token);
    xhttp.send(); 
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