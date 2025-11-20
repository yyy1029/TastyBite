

const sideMenu = document.querySelector('aside');
const menuBtn = document.querySelector("#menu_bar");
const closeBtn = document.querySelector("#close_bar");
const themeToggler = document.querySelector('.theme-toggler');
const availableLinks = document.querySelectorAll('.available a');
const starRatings = document.querySelectorAll('.star-rating');
const deleteButtons = document.querySelectorAll('.delete-button');


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
    window.location.href = "../../../Homepage.html";
});


const sidebarLinks = document.querySelectorAll('.sidebar a');
sidebarLinks.forEach(link => {
 link.addEventListener('click', function() {
     sidebarLinks.forEach(link => {
         link.classList.remove('active');
     });
     this.classList.add('active');
 });
});

//log out
var logoutButton = document.getElementById('logoutBtn');

logoutButton.addEventListener('click', function() {

    localStorage.removeItem('jwt');


    window.location.href = '../../../Homepage.html';
});

let resizeTimer;
function showMenuOnLargeScreens() {
    sideMenu.style.display = "block";
}
function handleResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        if (window.innerWidth <= 786) {
            showMenuOnSmallScreens(); 
        } else {
            showMenuOnLargeScreens();
        }
    }, 0);
}

handleResize();
window.addEventListener('resize', handleResize);

starRatings.forEach(starRating => {
    const stars = starRating.querySelectorAll('.star');
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            const rating = index + 1;
            stars.forEach((star, i) => {
                if (i < rating) {
                    star.textContent = '★';
                } else {
                    star.textContent = '☆';
                }
            });
            starRating.setAttribute('data-rating', rating);
        });
    });
});

deleteButtons.forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault();
        const row = button.closest('tr');
        if (confirm('Are you sure you want to delete?')) {
            row.remove();
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const closeButton = document.querySelector('.close-btn');
    const submitButton = document.querySelector('.submit-button');
    const commentLinks = document.querySelectorAll('.display-btn');

    submitButton.addEventListener('click', function (event) {
        event.preventDefault();
        // container2.style.display = 'none';
    });
});

function closePopup() {
    let popup = document.querySelector('.container2');
    popup.style.display = 'none';
}