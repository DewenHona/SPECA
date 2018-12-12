var response;
var token;


function login() {
    //alert("log")
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            console.log(response);
            if(response.auth) {
                alert("Succesfully logged in");
                window.location.href = "/home.html";
            } else {
                alert("username or password is incorrect");
            }
        }
    };
    xhttp.open("POST", "/api/auth/login", true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "name": `${document.getElementById('username').value}`, 
        "password": `${document.getElementById('password').value}`
    }));   
}

function register() {
    //alert("log")
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            console.log(response);
            if(response.auth) {
                alert("Succesfully created account");
                window.location.href = "/home.html";
            } else {
                alert("username exist, please try other name");
            }
        }
    };
    xhttp.open("POST", "/api/auth/register", true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "name": `${document.getElementById('username').value}`, 
        "password": `${document.getElementById('password').value}`
    }));   
}