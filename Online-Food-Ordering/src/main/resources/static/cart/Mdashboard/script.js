
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


const logo = document.querySelector('.logo');


logo.addEventListener('click', function () {

    window.location.href = "../../Homepage.html";
});




let resizeTimer;

function showMenuOnLargeScreens() {
    sideMenu.style.display = "block";
}

function handleResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
        if (window.innerWidth <= 786) {
            showMenuOnSmallScreens();
        } else {
            showMenuOnLargeScreens();
        }
    }, 0);
}


handleResize();


window.addEventListener('resize', handleResize);



var logoutButton = document.getElementById('logoutBtn');


logoutButton.addEventListener('click', function () {

    localStorage.removeItem('jwt');


    window.location.href = '../../Homepage.html';
});

