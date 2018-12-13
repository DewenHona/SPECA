(()=>{
    document.body.style.visibility = 'hidden';
    if(sessionStorage.token) {
        authenticate();
    } else {
        redirect();
    }
})();

function redirect() {
    window.location.href = "/login.html";
}


function authenticate() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const response = JSON.parse(this.responseText);
            console.log(response);
            if(!response.auth)
                redirect();
            else {
                document.body.style.visibility = 'visible';
                load();
            }
                
        }  
    };
    xhttp.open("POST", "/api/auth/authenticate", true);
    xhttp.setRequestHeader('Authorization', sessionStorage.token);
    xhttp.send();
}