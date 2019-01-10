window.onload = () => {
    if (sessionStorage.token) load();
}

var Components = {

}

var config = {
    processors: [1, 'p_id', ['p_model']],
    motherboards: [2, 'm_id', ['m_name']],
    ram: [3, 'r_id', ['r_brand', 'r_model', 'r_speed', 'r_capacity']],
    graphics: [4, 'g_id', ['g_model', 'g_vram']],
    ssd: [5, 's_id', ['s_type', 's_brand', 's_model', 's_capacity']],
    hdd: [6, 's_id', ['s_type', 's_brand', 's_model', 's_capacity']],
    psu: [7, 'psu_id', ['psu_brand', 'psu_model', 'psu_rating', 'psu_modular']],
    case: [8, 'c_id', ['c_brand', 'c_model', 'c_form_factor']],
    cooling: [9, 'cooler_id', ['cooler_brand', 'cooler_model']],
    display: [10, 'disp_id', ['disp_resolution', 'disp_refresh_rate', 'disp_size_type', 'disp_panel_type']]
}

function load() {
    for (key in config)
        loadComponent(key);
}

function loadComponent(apiname) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            Components[apiname] = JSON.parse(this.responseText);
            displayComponent(apiname)
        }
    };
    xhttp.open("GET", "/api/components/" + apiname, true);
    xhttp.send();
}

function displayComponent(apiname) {
    console.log(apiname)
    var parentDiv = document.getElementById(apiname + "-bookmark");
    var comp = Components[apiname]
    var attr = config[apiname]
    for (var i = 0; i < comp.length; i++) {
        var childDiv = document.createElement('div');
        childDiv.setAttribute('class', 'part');
        var img = document.createElement('img');
        const type = attr[0];
        const id = Components[apiname][i][attr[1]];
        const src = `/images/components/${type}/${id}.png`
        img.setAttribute('src', src);
<<<<<<< HEAD
        img.setAttribute('class', 'prod-img');
        img.setAttribute('height', '120px');
        img.setAttribute('width', '120px');
=======
        img.setAttribute('height', '170px');
        img.setAttribute('width', '170px');
>>>>>>> f82d5e92d52145cda77159bb087b262c95ea14c1
        childDiv.appendChild(img);
        var label = document.createElement('label');
        label.setAttribute('class', 'part-name');
        var name = ''
        attr[2].forEach(element => {
            name += comp[i][element] + " "
        });
        label.innerHTML = name;
        childDiv.appendChild(label);
        var btn = document.createElement('button');
        btn.setAttribute('class', 'save');
        btn.innerHTML = "Save";
        btn.onclick = function () {
            postBookmark(type, id)
        }
        childDiv.appendChild(btn);
        parentDiv.appendChild(childDiv);
    }
}