(()=>{
    document.body.style.visibility = 'hidden';
    if(sessionStorage.token) {
        document.body.style.visibility = 'visible'
    } else {
        redirect();
    }
})();

function redirect() {
    window.location.href = "/login.html";
}
