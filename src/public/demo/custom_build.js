
var resp;

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       //document.getElementById("demo").innerHTML = this.responseText;
       resp = JSON.parse(this.responseText)
       //console.table(resp);
       //createTable(resp)
       myFunction(resp)
      }
    };
    xhttp.open("GET", "/api/components", true);
    xhttp.send();
}

function createTable(json) {
    var ul = document.getElementById('test');
    var i =0 ;
    for(p of json) {
        var li = document.createElement('li');
        li.innerHTML = p.c_name;
        ul.appendChild(li); 
        i++;
    }

    alert(resp[4].c_name)
}

function myFunction(json) {
    var x = document.createElement("SELECT");
    x.setAttribute("id", "mySelect");
    document.body.appendChild(x);

    var i =0 ;
    for(p of json) {       
        var z = document.createElement("option");
        z.setAttribute("value", p.c_name);
        var t = document.createTextNode(p.c_name);
        z.appendChild(t);
        document.getElementById("mySelect").appendChild(z);
        i++;
    }

}

window.onload = loadDoc;