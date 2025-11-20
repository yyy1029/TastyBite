//dark theme
const sideMenu = document.querySelector('aside');
const menuBtn = document.querySelector("#menu_bar");
const closeBtn = document.querySelector("#close_bar");

const themeToggler =document.querySelector('.theme-toggler');


menuBtn.addEventListener('click',()=>
{
    sideMenu.style.display="block";
})

closeBtn.addEventListener('click',()=>
{
    sideMenu.style.display="none";
})

themeToggler.addEventListener('click',()=>
{

    document.body.classList.toggle('dark-theme-variables')
    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active')
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active')
})

const logo = document.querySelector('.logo');

logo.addEventListener('click', function() {
    // 在这里编写返回主页的代码，例如跳转到主页的 URL
    window.location.href = "/Homepage.html";
});


var logoutButton = document.getElementById('logoutBtn');

logoutButton.addEventListener('click', function() {
    localStorage.removeItem('jwt');

    window.location.href = '/Homepage.html';
});


document.addEventListener('DOMContentLoaded', function () {
    const userProfileForm = document.getElementById('userProfileForm');
    const messageBox = document.getElementById('message');

    // Handle form submission
    userProfileForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(userProfileForm);
        const userData = {};
        formData.forEach((value, key) => userData[key] = value);

        // Simulate an API call to update user information
        simulateApiCall(userData)
            .then(response => {
                messageBox.innerText = 'Profile updated successfully!';
                messageBox.style.color = 'green';
            })
            .catch(error => {
                messageBox.innerText = 'Error updating profile. Please try again.';
                messageBox.style.color = 'red';
            });

        if (Url) {
            userData['newAvatarUrl'] = Url;
        }
        console.log(userData);
        updateUserProfile(userData);
    });

    // Simulated API call function
    function simulateApiCall(data) {
        return new Promise((resolve, reject) => {
            // Simulate network response time
            setTimeout(() => {
                if (data.username && data.password) {
                    resolve(true);
                } else {
                    reject('Invalid input');
                }
            }, 1000);
        });
    }
});

function checkPasswordStrength() {
    var password = document.getElementById("newPassword").value;
    var strengthBar = document.getElementById("passwordStrength");
    var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])");
    var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9])))");
    if (strongRegex.test(password)) {
        strengthBar.innerHTML = "Strong";
        strengthBar.className = "password-strength strong";
    } else if (mediumRegex.test(password)) {
        strengthBar.innerHTML = "Medium";
        strengthBar.className = "password-strength medium";
    } else {
        strengthBar.innerHTML = "Weak";
        strengthBar.className = "password-strength weak";
    }
}

let userid;
$('#newPassword').on('input', checkPasswordStrength);
function getUserProfile() {
    var jwt = localStorage.getItem('jwt');
    $.ajax({
        url: `http://localhost:8080/api/users/profile`, // GET endpoint
        type: 'GET',
        headers: {
            'Authorization': `Bearer ${jwt}`
        },
        success: function(response) {
            console.log('Profile data:', response);
            userid = response.id;
            // Handle response and update UI accordingly
        },
        error: function(xhr, status, error) {
            if(xhr.status == 403) {
            } else {
                console.error('Error fetching/updating profile:', error);
            }
        }

    });
}

// Function to update user profile
function updateUserProfile(formData) {
    var jwt = localStorage.getItem('jwt');
    $.ajax({
        url: `http://localhost:8080/api/users/${userid}/profile`, // PUT endpoint with userId
        type: 'PUT',
        data: JSON.stringify(formData),
        contentType: 'application/json',
        // contentType: false,
        headers: {
            'Authorization': `Bearer ${jwt}`
        },
        success: function(response) {
            console.log('Profile updated successfully:', response);
            // Update UI with response data or confirmation message
            alert("update success");
        },
        error: function(xhr, status, error) {
            console.error('Error updating profile:', error);
        }
    });
}
getUserProfile();

//avatar
let Url;
document.getElementById('newAvatar').addEventListener('change', function() {
    var file = this.files[0];
    var avatarPreview = document.getElementById('avatarPreview');
    if (file) {
        uploadAvatar(file)
            .then(function(avatarUrl) {
                console.log(avatarUrl);
                Url = avatarUrl;
                avatarPreview.innerHTML = '<img src="' + avatarUrl + '" alt="Avatar Preview">';
                document.getElementById('newAvatarUrl').value = avatarUrl;
            })
            .catch(function(error) {
                console.error('Error uploading avatar:', error);
            });
    }
});

function uploadAvatar(file) {
    return new Promise(function(resolve, reject) {
        const formData = new FormData();
        formData.append('file', file);

        const jwt = localStorage.getItem('jwt');
        $.ajax({
            url: 'http://localhost:8080/api/upload',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            headers: {
                'Authorization': `Bearer ${jwt}`
            },
            success: function(response) {
                console.log('Image uploaded successfully. URL:', response);
                resolve(response);
            },
            error: function(xhr, status, error) {
                console.error('Image upload failed. Status:', xhr.status);
                reject(error);
            }
        });
    });
}



