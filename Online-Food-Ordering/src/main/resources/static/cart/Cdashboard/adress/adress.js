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

//log out
var logoutButton = document.getElementById('logoutBtn');

logoutButton.addEventListener('click', function() {
   
    localStorage.removeItem('jwt');

    window.location.href = '/Homepage.html';
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


//Sidebar issues

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



const addressModal = document.getElementById('addressModal');

const confirmaddressButton = document.getElementById('confirmaddressButton');

const deleteaddressButton = document.getElementById('deleteaddressButton');

addressModal.style.display = "none";

const openModalButton = document.querySelector('.add_address');

openModalButton.addEventListener("click", function() {
    addressModal.style.display = "block";

});

$('#confirmaddressButton').on('click', function(event) {
    console.log("Confirm button clicked");
    event.preventDefault();
    event.stopPropagation();

    //Get the address information in the input box
    var address = $('#addressname').val().trim();
    var username = $('#User').val().trim();
    var postalcode = $('#PostalCode').val().trim();

$.ajax({
    type: 'GET',
    url: 'http://localhost:8080/api/users/profile',
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
    },
    success: function(response) {

        var userId = response.id;
        console.log('User ID:', userId);
        
        if (address && username && postalcode && userId) {

            $.ajax({
                type: "POST",
                url: 'http://localhost:8080/api/address/' + userId ,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                },
                contentType: "application/json",
                data: JSON.stringify({
                    address: address,
                    username: username,
                    postalcode: postalcode
                }),//Package address, username and postcode into one object
                success: function(response) {
                    console.log(postalcode);
                    console.log('Address added successfully:', response);
                    
                    var newTableRow = '<tr>' +
                        '<td>' + response.id + '</td>' +
                        '<td>' + response.username + '</td>' +
                        '<td>' + response.address + '</td>' +
                        '<td>' + response.postalcode + '</td>' +
                        '<td class="action">' +
                        '<a href="#" class="edit-button"><span class="material-symbols-outlined">edit</span></a>' +
                        '<a href="#" class="delete-button"><span class="material-symbols-outlined">delete</span></a>' +
                        '</td>' +
                        '</tr>';
    

                    var tempElement = document.createElement('div');
                    tempElement.innerHTML = newTableRow.trim();
                    var newTableRowElement = tempElement.firstChild;
    
                    var tbodyElement = document.querySelector('.address');
                    tbodyElement.appendChild(newTableRowElement);
    
                    addressModal.style.display = "none";

                    $(document).ready(function() {
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
                                type: "GET",
                                url: 'http://localhost:8080/api/address/'+ userId, 
                                headers: {
                                    'Authorization': 'Bearer ' + localStorage.getItem('jwt') 
                                },
                                success: function(response) {  
                                
                                    renderaddress(response);

                                },
                                error: function(xhr, status, error) {
                                
                                    console.error(error);

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

                },
                error: function(xhr, status, error) {
                    console.error('Error adding address:', error);
                    // 可以显示错误信息给用户
                    alert('Error adding address. Please try again later.');
                }
            });
        }

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


    

//load category
$(document).ready(function() {
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
                type: "GET",
                url: 'http://localhost:8080/api/address/'+ userId,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                },
                success: function(response) { 
                   
                    renderaddress(response);

                },
                error: function(xhr, status, error) {
                 
                    console.error(error);

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


function renderaddress(addresses) {
  
    $('.addresses').empty();

     //Iterate over each category and create the corresponding table
    addresses.forEach(function(address) {
        var newTable = '<div class="address">' +
            '<table>' +
            '<thead>' +
            '<tr>' +
            '<th>ID</th>' +
            '<th>User name</th>' +
            '<th>Address</th>' +
            '<th>PostalCode</th>' +
            '<th>Action</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>' +
            '<tr>' +
            '<td>' + address.id + '</td>' +
            '<td>' + address.username + '</td>' +
            '<td>' + address.address + '</td>' +
            '<td>' + address.postalCode + '</td>' +
            '<td class="action">' +
            '<a href="#" class="edit-button"><span class="material-symbols-outlined">edit</span></a>' +
            '</td>' +
            '</tr>' +
            '</tbody>' +
            '</table>' +
            '</div>';

        $('.addresses').append(newTable);
    });


    $('.edit-button').click(function(event) {
        event.preventDefault();

        const id = $(this).closest('.address').find('td:first').text().trim();
        const User = $(this).closest('.address').find('td:nth-child(2)').text().trim();
        const address = $(this).closest('.address').find('td:nth-child(3)').text().trim();
        const  postalcode= $(this).closest('.address').find('td:nth-child(4)').text().trim();
        
        if (id) {
            openEditModal(id, User,address,postalcode);
        } else {
            console.error('Invalid Id:', Id);
        
            alert('Invalid Id. Please try again later.');
        }
        
    });

}
 


$('#deleteaddressButton').on('click', function() {
    addressModal.style.display = "none";
});


function openEditModal(id,User,address,postalcode) {
    $('#editId').val(id);
    $('#editIdText').text(id);
    $('#editUser').val(User);
    $('#editaddress').val(address);
    $('#editPostalCode').val(postalcode);
    $('#editModal').show();
}


$('#confirmEditButton').click(function(event) {
    event.preventDefault();
    const Id = $('#editId').val();

    //Get the category ID to change and the new category name.
    const newUser = $('#editUser').val();
    const newAddress = $('#editaddress').val();
    const newPostalCode = $('#editPostalCode').val();
    console.log(Id);
    console.log(newUser);

    const updatedAdddress = {
        address: newAddress,
        postalcode:newPostalCode,
        username: newUser
    };

    $.ajax({
        type: 'PUT',
        url: 'http://localhost:8080/api/address/' + Id,
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        contentType: 'application/json',
        data: JSON.stringify(updatedAdddress),
        success: function(response) {
            
            console.log('Updated successfully:', response);
           
            $('#editModal').hide();
         
        //load category
        $(document).ready(function() {
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
                        type: "GET",
                        url: 'http://localhost:8080/api/address/'+ userId,
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                        },
                        success: function(response) {
                    
                            renderaddress(response);

                        },
                        error: function(xhr, status, error) {
                        
                            console.error(error);

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


        },
        error: function(xhr, status, error) {
            
            console.error('Error updating category name:', error);
           
            alert('Error updating address. Please try again later.');
        }

    });
    
});


const deleteEditButton = document.getElementById('deleteEditButton');

deleteEditButton.addEventListener('click', function() {
    editModal.style.display = 'none';

});
