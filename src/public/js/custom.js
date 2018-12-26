const Components = {}
let Build = {}
let c = false;

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
        var pkey = config[apiname][0];
        var val = Components[apiname][i][pkey];
        var property = apiname === 'case'? 'ccase': apiname;
        option.setAttribute("value", `${property} : ${val}`);
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
    if(c) {
        select.options[Build.build[apiname]].selected = 'selected';
    }
}

const config = {
//  format is ->
//  <api> : [<primary key>[<coloumn names>]]
//  dont edit this without asking 0ya-sh0
    processors: ['p_id',['p_model']],
    motherboards: ['m_id',['m_name']],
    graphics: ['g_id',['g_model','g_vram']],
    ram: ['r_id',['r_brand','r_model','r_speed','r_capacity']],
    psu: ['psu_id',['psu_brand','psu_model','psu_rating','psu_modular']],
    cooling: ['cooler_id',['cooler_brand','cooler_model']],
    ssd: ['s_id',['s_type','s_brand','s_model','s_capacity']],
    hdd: ['s_id',['s_type','s_brand','s_model','s_capacity']],
    display: ['disp_id',['disp_resolution','disp_refresh_rate','disp_size_type','disp_panel_type']],
    case: ['c_id',['c_brand','c_model','c_form_factor']]
}

function load() {
    Build = sessionStorage.getItem('customize');
    if(Build) {
        Build = JSON.parse(Build);
        sessionStorage.removeItem('customize');
        c = true;
        document.getElementById('build_name').value = Build.name;
        if(Build.id) {
            document.getElementsByClassName('subsave')[0].onclick = function() {
                save_build(putBuild,Build.id);
            }
        } else {
            document.getElementsByClassName('subsave')[0].onclick = function() {
                save_build(postBuild,null);
            }
        }
    } else {
        document.getElementsByClassName('subsave')[0].onclick = function() {
            save_build(postBuild,null);
        }
    }
    for(key in config)
        loadComponent(key, config[key][1]);
}

function save_build(clbk,id) {
    let build = {};
    let i = 0;
    for(key in config) {
        let select = document.getElementById(`${key}-selector`);
        build[i.toString()] = select.options[select.selectedIndex].value;
        i++;
    }
    build[i.toString()] = "title : " + document.getElementById('build_name').value;
    console.log(build);
    clbk(build,id);
}

function postBuild(data,id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if(JSON.parse(this.responseText).success) {
                window.location.href = '/dashboard.html';
            }
        }
    };
    xhttp.open("POST", "/api/auth/user/build", true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.setRequestHeader('Authorization', sessionStorage.token);
    xhttp.send(JSON.stringify(data));
}

function putBuild(data,id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if(JSON.parse(this.responseText).success) {
                window.location.href = '/dashboard.html';
            }
        }
    };
    xhttp.open("PUT", "/api/auth/user/build/"+id, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.setRequestHeader('Authorization', sessionStorage.token);
    xhttp.send(JSON.stringify(data));
}

window.onload = () => { if(sessionStorage.token) load();}

