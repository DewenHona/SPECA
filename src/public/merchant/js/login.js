var response;
var token;


function login() {
    alert("log")
    const uname = document.getElementById('username').value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            console.log(response);
            if(response.auth) {
                //alert("Succesfully logged in");
                sessionStorage.setItem('token', response.token);
                sessionStorage.setItem('name', uname);
                window.location.href = "/dashboard.html";
            } else {
                alert("username or password is incorrect");
            }
        }
    };
    xhttp.open("POST", "/api/merchant/login", true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "name": `${document.getElementById('username').value}`, 
        "password": `${document.getElementById('password').value}`
    }));   
}

function register() {
    //alert("log")
    const uname = document.getElementById('username').value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            console.log(response);
            if(response.auth) {
                //alert("Succesfully created account");
                sessionStorage.setItem('token', response.token);
                sessionStorage.setItem('name', uname);
                window.location.href = "/dashboard.html";
            } else {
                alert("username exist, please try other name");
            }
        }
    };
    xhttp.open("POST", "/api/merchant/register", true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "name": `${document.getElementById('username').value}`, 
        "password": `${document.getElementById('password').value}`
    }));   
}