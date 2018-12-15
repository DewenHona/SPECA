window.onload = function() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('builds').innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "/api/me", true);
    xhttp.setRequestHeader('Authorization', sessionStorage.token);
    xhttp.send();
}