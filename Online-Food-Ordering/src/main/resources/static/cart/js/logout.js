
//log out
var logoutButton = document.getElementById('logoutBtn');

logoutButton.addEventListener('click', function() {
    
    localStorage.removeItem('jwt');


    window.location.href = '../../../Homepage.html';
});