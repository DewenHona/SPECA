var response;
var token;


function login() {
    const uname = document.getElementById('username').value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            console.log(response);
            if(response.auth) {
                alert("Succesfully logged in");
                sessionStorage.setItem('mtoken', response.token);
                sessionStorage.setItem('mname', uname);
                window.location.href = "/merchant/dashboard.html";
            } else {
                alert("username or password is incorrect");
            }
        }
    };
    xhttp.open("POST", "/api/merchants/"+uname+"/login", true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "name": `${document.getElementById('username').value}`, 
        "password": `${document.getElementById('password').value}`
    }));   
}

function register() {
    //alert("log")
    const uname = document.getElementById('username').value;
    const firmName = document.getElementById('firm').value;
    if(firmName === '') {
        alert("Please enter firm name to register")
        return;
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            console.log(response);
            if(response.auth) {
                alert("Succesfully created account");
                sessionStorage.setItem('mtoken', response.token);
                sessionStorage.setItem('mname', uname);
                window.location.href = "/merchant/dashboard.html";
            } else {
                alert("username exist, please try other name");
            }
        }
    };
    xhttp.open("POST", "/api/merchants", true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "name": `${document.getElementById('username').value}`, 
        "firm" : `${firmName}`,
        "password": `${document.getElementById('password').value}`
    }));   
}