var currentQuestion;
var autoContain;
var sectionTitle;
var autoForm;
var answers = {};
var configAuto;

var Build = {};
var CopyBuild = {};
var Total;
var Count;

window.onload = function() {
    autoContain = document.getElementsByClassName("auto-contain")[0];
    sectionTitle = document.getElementsByClassName("section-title")[0];
    autoForm = document.getElementsByClassName("auto-form")[0];
    document.getElementById('all-build-contain').style.visibility = 'hidden';
    document.getElementsByClassName('custom-buttons')[0].style.visibility = 'hidden';
    getQuestions(() => {
        displayQuestion(0);
    });
}

function getQuestions(clbk) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            configAuto = JSON.parse(this.responseText);
            console.log(configAuto);
            clbk();
        }
    };
    xhttp.open("GET", "/api/auth/user/build/auto", true);
    xhttp.setRequestHeader('Authorization', sessionStorage.token);
    xhttp.send();
}

function  displayQuestion(id) {
    if(id == null) {
        sectionTitle.innerHTML = 'Your build is getting prepaired....';
        autoForm.innerHTML = '';
        document.getElementsByClassName('auto-next')[0].style.visibility = "hidden";
        postAnswers(answers);
        return;
    }
    currentQuestion = id;
    sectionTitle.innerHTML = configAuto[id].question;
    autoForm.innerHTML = '';
    configAuto[id].options.forEach((opt)=>{
        var div = document.createElement('div');
        div.setAttribute('class', 'sec');
        var input = document.createElement('input');
        input.type = "radio";
        input.value = opt.option;
        input.name = configAuto[id].question;
        div.appendChild(input);
        var label = document.createElement('label');
        label.setAttribute('class', 'sec-label');
        label.innerHTML = opt.option;
        div.appendChild(label);
        div.appendChild(document.createElement('br'));
        var p = document.createElement('p');
        p.setAttribute('class', 'sec-desc');
        p.innerHTML = opt.description;
        div.appendChild(p);
        autoForm.appendChild(div);
    });
}


function nextQuestion() {
    for(var i=0; i<autoForm.length; i++) {
        if(autoForm[i].checked) {
            answers[currentQuestion] = i;
            var nq = configAuto[currentQuestion].options[i].question;
            displayQuestion(nq);
            break;
        }     
    }
}



///////////////////////////////////////////////////////////////////////////////////////

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
    ssd: ['SSD',['s_type','s_brand','s_model','s_capacity']],
    hdd: ['HDD',['s_type','s_brand','s_model','s_capacity']],
    display: ['Display',['disp_resolution','disp_refresh_rate','disp_size_type','disp_panel_type']],
    case: ['Case',['c_brand','c_model','c_form_factor']]
}


function postAnswers(data) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            Build = (JSON.parse(this.responseText));
            CopyBuild = (JSON.parse(this.responseText));
            Total = 10;
            Count = 0;
            var k = Object.keys(config);
            for(z of k) {
                var x = z=='case'?'ccase':z;
                fetchComponent(z, fetchCompleted);
            }
        }
    };
    xhttp.open("POST", "/api/auth/user/build/auto", true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.setRequestHeader('Authorization', sessionStorage.token);
    xhttp.send(JSON.stringify(data));
}

function fetchComponent(z, cb) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            Count++;
            //var n = z == 'case'?'ccase':z;
            Build[z] = JSON.parse(this.responseText)[0];    
            if(Total <= Count)
                cb();
        }
    };
    xhttp.open("GET", "/api/components/"+z+"/"+Build[z], true);
    xhttp.send();
}

function fetchCompleted() {
    console.log(Build);
    autoContain.style.display = "none"
    document.getElementById('all-build-contain').style.visibility = "visible";
    displayBuild(0);
    document.getElementsByClassName('custom-buttons')[0].style.visibility = 'visible';
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
         //k = k == 'case'? 'ccase': k;
        //console.log(Build[k][property]);
        name += Build[k][property] + ' ';
    });
    return name;
}

function save_build() {
    let build = {};
    let i = 0;
    for(key in CopyBuild) {
        var property = key === 'case'? 'ccase': key;
        build[i.toString()] = property +" : "+CopyBuild[key];
        i++;
    }
    build[i.toString()] = "title : " + document.getElementById('build_name').value;
    console.log(build);
    postBuild(build);
}

function postBuild(data) {
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



function discard() {
    window.location.href = "./automated.html";
}












