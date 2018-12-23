var currentQuestion;
var autoContain;
var sectionTitle;
var autoForm;
var answers = {};

window.onload = function() {
    autoContain = document.getElementsByClassName("auto-contain")[0];
    sectionTitle = document.getElementsByClassName("section-title")[0];
    autoForm = document.getElementsByClassName("auto-form")[0];
    displayQuestion(0);
}


function  displayQuestion(id) {
    if(id == null) {
        sectionTitle.innerHTML = 'ok preparing suggestion';
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
            answers[configAuto[currentQuestion].question] = configAuto[currentQuestion].options[i].option;
            var nq = configAuto[currentQuestion].options[i].question;
            displayQuestion(nq);
            break;
        }     
    }
}

function postAnswers(data) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(this.responseText));
        }
    };
    xhttp.open("POST", "/api/auth/user/build/auto", true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.setRequestHeader('Authorization', sessionStorage.token);
    xhttp.send(JSON.stringify(data));
}