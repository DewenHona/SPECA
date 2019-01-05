function fetchBookmarks() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            bk = JSON.parse(this.responseText);
            console.log(bk)
        }
    };
    xhttp.open("GET", "/api/auth/user/bookmarks", true);
    xhttp.setRequestHeader('Authorization', sessionStorage.token);
    xhttp.send();
}

function postBookmark(type,id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            bk = JSON.parse(this.responseText);
            console.log(bk)
        }
    };
    xhttp.open("POST", "/api/auth/user/bookmarks", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader('Authorization', sessionStorage.token);
    var data = {type,id}
    console.log(data)
    xhttp.send(JSON.stringify(data));
}