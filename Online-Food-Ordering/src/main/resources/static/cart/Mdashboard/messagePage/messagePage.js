const sideMenu = document.querySelector('aside');
const menuBtn = document.querySelector("#menu_bar");
const closeBtn = document.querySelector("#close_bar");

const themeToggler = document.querySelector('.theme-toggler');


menuBtn.addEventListener('click', () => {
    sideMenu.style.display = "block";
})

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = "none";
})

themeToggler.addEventListener('click', () => {

    document.body.classList.toggle('dark-theme-variables')
    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active')
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active')
})

// Sidebar Click the button to set the active property
// Get all the sidebar buttons
const sidebarLinks = document.querySelectorAll('.sidebar a');

// Go through each button
sidebarLinks.forEach(link => {
    // Add a click event listener
    link.addEventListener('click', function () {
        // Remove the active class of all buttons
        sidebarLinks.forEach(link => {
            link.classList.remove('active');
        });
        // Add an active class to the currently clicked button
        this.classList.add('active');
    });
});



// Put this last or there will be bugs
function showMenuOnLargeScreens() {
    sideMenu.style.display = "block";
}


// Detects the screen size and executes the corresponding function based on the result
if (window.matchMedia("(max-width: 786px)").matches) {
    showMenuOnSmallScreens();
} else {
    showMenuOnLargeScreens();
}

// Eliminate the impact of screen changes too late to transition aside state
window.addEventListener('resize', function () {
    if (window.innerWidth <= 786) {
        showMenuOnSmallScreens();
    } else {
        showMenuOnLargeScreens();
    }
});

// Update the profile picture and name in the upper right corner
window.addEventListener('load', function () {
    // Reads JWT from local storage
    var jwt = localStorage.getItem('jwt');
    if (jwt) {
        // Request user information from the backend
        getUserInfo(jwt);
    }
});
function getUserInfo(jwt) {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/users/profile', // Suppose this is the interface for getting user information
        headers: {
            'Authorization': 'Bearer ' + jwt // Add JWT to the request header
        },
        success: function (response) {
            // Update the user name and avatar on the page
            updateUserInfo(response.fullName, response.avatar);
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
            // Handle error situations
        }
    });
}
function updateUserInfo(name, avatar) {
    var nameElement = document.querySelector('.info p b');
    var avatarElement = document.querySelector('.profile_photo img');
    nameElement.textContent = name;
    avatarElement.src = avatar;
}

// The information is deleted
document.querySelectorAll('.delete').forEach(deleteButton => {
    deleteButton.addEventListener('click', function (event) {
        event.preventDefault();
        const update = deleteButton.closest('.update');
        if (confirm('Are you sure you want to delete this message?')) {
            update.remove();
        }
    });
});
// Displayed on the left
document.addEventListener('DOMContentLoaded', function () {
    const msgCount = document.querySelector('.msg_count');
    const deleteButtons = document.querySelectorAll('.delete');

    deleteButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const update = button.closest('.update');
            if (confirm('Are you sure you want to delete this message?')) {
                update.remove();
                // Subtract 1 and update the message count display
                let count = parseInt(msgCount.textContent);
                count--;
                msgCount.textContent = count;
            }
        });
    });
});
// Filter
// Get the Star Filter button
const filterButtons = document.querySelectorAll('.star-filter');

// Add a click event listener
filterButtons.forEach(button => {
    button.addEventListener('click', function () {
        const selectedRating = parseInt(button.dataset.rating);

        // Get all message elements
        const messageElements = document.querySelectorAll('.update');

        // Iterate through the message elements, showing or hiding according to the star rating filter
        messageElements.forEach(messageElement => {
            const messageRating = parseInt(messageElement.dataset.rating);
            if (messageRating >= selectedRating) {
                messageElement.style.display = 'block';
            } else {
                messageElement.style.display = 'none';
            }
        });
    });
});
// get the logo element
const logo = document.querySelector('.logo');

logo.addEventListener('click', function () {
    window.location.href = "/Homepage.html";
});

//log out
var logoutButton = document.getElementById('logoutBtn');

logoutButton.addEventListener('click', function () {

    localStorage.removeItem('jwt');

    window.location.href = '/Homepage.html';
});

