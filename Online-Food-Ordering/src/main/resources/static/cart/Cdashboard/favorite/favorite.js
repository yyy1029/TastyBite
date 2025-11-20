
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


const sidebarLinks = document.querySelectorAll('.sidebar a');


sidebarLinks.forEach(link => {
 
 link.addEventListener('click', function() {
   
     sidebarLinks.forEach(link => {
         link.classList.remove('active');
     });
    
     this.classList.add('active');
 });
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


document.addEventListener('DOMContentLoaded', function() {
    getUserFavorites();
});


function getUserFavorites() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/users/profile',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        success: function(response) {
            var userId = response.id;
            console.log('User ID:', userId);
            
            $.ajax({
                type: 'GET',
                url: 'http://localhost:8080/api/users/' + userId + '/favorites',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                },
                success: function(response) {
                    console.log('User favorites retrieved successfully:', response);
                    
                    renderFavorites(response);
                },
                error: function(xhr, status, error) {
                    console.error('Error retrieving user favorites:', error);
                }
            });
        },
        error: function(xhr, status, error) {
            if (xhr.status === 401) {
                console.error('Unauthorized! Please login again.');
            } else {
                console.error('Error:', error);
            }
        }
    });
}


function renderFavorites(dishes) {
    
    $('.dishes').empty();

    
    dishes.forEach(function(dish) {
        var newTable = '<div class="dish">' +
            '<table>' +
                '<thead>' +
                    '<tr>' +
                        '<th>Image</th>' +
                        '<th>Dish Name</th>' +
                        '<th>Description</th>' +
                        '<th>Price</th>' +
                        '<th>Action</th>' +
                    '</tr>' +
                '</thead>' +
                '<tbody>' +
                    '<tr>' +
                    '<td><img src="' + dish.images + '" alt="" style="width: 100px; height: 100px;"></td>' +
                        '<td>' + dish.name + '</td>' +
                        '<td>' + dish.description + '</td>' +
                        '<td>$' + dish.price + '</td>' +
                        '<td class="action">' +
                        '<a href="#" class="delete-button" data-dish-id="' + dish.id + '"><span class="material-symbols-outlined">delete</span></a>' +
                        '</td>' +
                    '</tr>' +
                '</tbody>' +
            '</table>' +
        '</div>';

        
        $('.dishes').append(newTable);

        
    });


}


$('.dishes').on('click', '.delete-button', function(event) {
    event.preventDefault();

    var deleteButton = $(this);

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/users/profile',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        success: function(response) {
            var userId = response.id; 

            var dishId = deleteButton.data('dish-id');

            $.ajax({
                type: 'DELETE',
                url: 'http://localhost:8080/api/users/' + userId + '/favorites/remove/' + dishId,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt') 
                },
                success: function(response) {
                  
                    console.log('Dish deleted successfully:', response);
                    deleteButton.closest('.dish').remove(); 
                },
                error: function(xhr, status, error) {
                    console.error('Error deleting dish:', error);
                   
                    alert('Error deleting dish. Please try again later.');
                }
            });
        },
        error: function(xhr, status, error) {
            if (xhr.status === 401) {
                console.error('Unauthorized! Please login again.');
            } else {
                console.error('Error:', error);
            }
        }
    });
});

//log out
var logoutButton = document.getElementById('logoutBtn');


logoutButton.addEventListener('click', function() {
    
    localStorage.removeItem('jwt');

   
    window.location.href = '/Homepage.html';
});