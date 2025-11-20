//MENU
const divtoShow = 'nav .menu'
const divPopup = document.querySelector(divtoShow);
const divTrigger = document.querySelector('.m-trigger');


divTrigger.addEventListener('click', () => {
    setTimeout(()=>{
        if(!divPopup.classList.contains('show')){
            divPopup.classList.add('show');
            document.body.classList.add('menu-visible')
        }
    },250);
})

//click outside menu closing
document.addEventListener('click',(e)=>{
    const isClosest = e.target.closest(divtoShow);
   
    if (!isClosest && divPopup.classList.contains('show')) {
        divPopup.classList.remove('show');
        document.body.classList.remove('menu-visible');
    }
});


//search
const sTrigger = document.querySelector('.s-trigger');
const addclass = document.querySelector('.site');
sTrigger.addEventListener('click',()=>{
    addclass.classList.toggle('showsearch')
})



const sliderThumb = new Swiper('.thumb-nav', {
    spaceBetween: 10,
    slidesPerView: 3, 
    slidesPerGroup: false,
    breakpoints: {
        992: {
            direction: 'vertical'
        }
    }
});
  
const theSlider = new Swiper('.thumb-big', {
    slidesPerView: 1, 
    pagination: {
        el: '.swiper-pagination',
    },
    thumbs: {
        swiper: sliderThumb,
    }
});




//scroll transition
const io = new IntersectionObserver(entries=> {
    entries.forEach(entry=>{
        if(entry.intersectionRatio>0){
            entry.target.classList.add('this')
        }
    })
})

const box = document.querySelectorAll('.animate');
     box.forEach((el)=>{
        io.observe(el);
     })




     //hid user submenu
     function toggleMenu() {
        var submenu = document.getElementById("submenu");
        submenu.classList.toggle("open-menu");
    }

    document.addEventListener("click", function(event) {
    var menu = document.getElementById("submenu");
    var userButton = document.querySelector(".user");

  
    if (!menu.contains(event.target) && !userButton.contains(event.target)) {
        
        menu.classList.remove("open-menu");
    }
});

//log out
var logoutButton = document.getElementById('logoutBtn');


logoutButton.addEventListener('click', function() {
   
    localStorage.removeItem('jwt');
    
    
    window.location.href = '../../Homepage.html';
});


//submenu changes after login

$(document).ready(function() {
   
    var jwt = localStorage.getItem('jwt');

    if (jwt) {
       
        loginSuccess();
        
    } else {
        
        logout();
    }



});

function loginSuccess() {
   
    document.getElementById('signin').classList.add('disabled-link');
    document.getElementById('signup').classList.add('disabled-link');
}

// 未登录时执行的操作
function logout() {
    
    document.getElementById('logoutBtn').classList.add('disabled-link');
    document.getElementById('dashboard').classList.add('disabled-link');
}


//avatar & Role
$('#userButton').click(function(event) {
    event.preventDefault(); 

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/users/profile', 
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt') 
        },
        success: function(response) {
     
            console.log('User information:', response);
            var avatarUrl = response.avatar;
            var fullName = response.fullName;

            localStorage.setItem('userInfo', JSON.stringify(response))


            
            $('#userAvatar').attr('src', avatarUrl);

           
            $('#userName').text(fullName);

        },
        error: function(xhr, status, error) {
           
            console.error('Error:', error);
        }
    });
});

$("#dashboard").click(function(event){
    event.preventDefault();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/users/profile',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt') 
        },
        success: function(response) {
            console.log('User information:', response);
          
            var userRole = response.role;

            if (userRole === "ROLE_MANAGER") {
                window.location.href = "../cart/Mdashboard/Mdashboard.html";
            } else{
                window.location.href = "../cart/Cdashboard/Cdashboard.html";
            }

        },
        error: function(xhr, status, error) {
            
            console.error('Error:', error);
        }
    });

});
