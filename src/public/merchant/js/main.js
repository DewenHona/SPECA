const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('name');
    window.location.href = '/home.html';
}