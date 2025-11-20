
window.addEventListener('load', function() {
    var jwt = localStorage.getItem('jwt');
    if (jwt) {
        getUserInfo(jwt);
    }
});
function getUserInfo(jwt) {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/users/profile',
        headers: {
            'Authorization': 'Bearer ' + jwt
        },
        success: function(response) {
            updateUserInfo(response.fullName, response.avatar);
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
          
        }
    });
}
function updateUserInfo(name, avatar) {
    var nameElement = document.querySelector('.info p b');
    var avatarElement = document.querySelector('.profile_photo img');
    nameElement.textContent = name;
    avatarElement.src = avatar;
}