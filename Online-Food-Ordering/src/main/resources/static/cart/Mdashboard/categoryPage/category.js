
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


const sidebarLinks = document.querySelectorAll('.sidebar a');


sidebarLinks.forEach(link => {
    link.addEventListener('click', function () {
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

window.addEventListener('load', function () {
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
        success: function (response) {
            updateUserInfo(response.fullName, response.avatar);
        },
        error: function (xhr, status, error) {
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


const categoryModal = document.getElementById('categoryModal');

const confirmCategoryButton = document.getElementById('confirmCategoryButton');

const deleteCategoryButton = document.getElementById('deleteCategoryButton');

categoryModal.style.display = "none";

const openModalButton = document.querySelector('.add_products');

openModalButton.addEventListener("click", function () {
    categoryModal.style.display = "block";

});


$('#confirmCategoryButton').on('click', function () {
    console.log("Confirm button clicked");
    event.preventDefault();
    event.stopPropagation();

    var categoryName = $('#categoryName').val().trim();
    if (categoryName) {
        var category = {
            "name": categoryName
        };
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/api/api/category",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            contentType: "application/json",
            data: JSON.stringify(category),
            success: function (response) {
                // On success, append the new category to the table
                newTable = '<div class="category">' +
                    '<table>' +
                    '<thead>' +
                    '<tr>' +
                    '<th>ID</th>' +
                    '<th>Category Name</th>' +
                    '<th>Action</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody>' +
                    '<tr>' +
                    '<td>' + response.id + '</td>' +
                    '<td>' + response.name + '</td>' +
                    '<td class="action">' +
                    '<a href="#" class="edit-button"><span class="material-symbols-outlined">edit</span></a>' +
                    '<a href="#" class="delete-button"><span class="material-symbols-outlined">delete</span></a>' +
                    '</td>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>' +
                    '</div>';

                var tempElement = document.createElement('div');
                tempElement.innerHTML = newTable.trim();
                var newTableElement = tempElement.firstChild;
                var categoriesContainer = document.querySelector('.categories');
                categoriesContainer.appendChild(newTableElement);

                categoryModal.style.display = "none";

                $(document).ready(function () {

                    $.ajax({
                        type: "GET",
                        url: "http://localhost:8080/api/category",
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                        },
                        success: function (response) {
                            renderCategories(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error);
                        }
                    });
                });

            },
            error: function (xhr, status, error) {
                if (xhr.status === 400) {
                    alert('Category name already exists!');
                } else {
                    console.error(error);
                }
            }
        });
    } else {
        alert('Please fill the category name!');
    }
});


//load category
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/category",
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        success: function (response) {
            renderCategories(response);
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });
});


function renderCategories(categories) {
    $('.categories').empty();

    categories.forEach(function (category) {
        var newTable = '<div class="category">' +
            '<table>' +
            '<thead>' +
            '<tr>' +
            '<th>ID</th>' +
            '<th>Category Name</th>' +
            '<th>Action</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>' +
            '<tr>' +
            '<td>' + category.id + '</td>' +
            '<td>' + category.name + '</td>' +
            '<td class="action">' +
            '<a href="#" class="edit-button"><span class="material-symbols-outlined">edit</span></a>' +
            '<a href="#" class="delete-button"><span class="material-symbols-outlined">delete</span></a>' +
            '</td>' +
            '</tr>' +
            '</tbody>' +
            '</table>' +
            '</div>';
        $('.categories').append(newTable);
    });


    $('.edit-button').click(function (event) {
        event.preventDefault();
        const categoryId = $(this).closest('.category').find('td:first').text().trim();
        const categoryName = $(this).closest('.category').find('td:nth-child(2)').text().trim();

        if (categoryId) {
            openEditModal(categoryId, categoryName);
        } else {
            console.error('Invalid categoryId:', categoryId);
            alert('Invalid categoryId. Please try again later.');
        }

    });


    $('.delete-button').click(function (event) {
        event.preventDefault();
        const categoryId = $(this).closest('.category').find('td:first').text().trim();
        console.log(categoryId);

        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:8080/api/category/delete/' + categoryId,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            success: function (response) {
                console.log('Category deleted successfully:', response);
                $(this).closest('.category').remove();
                $(document).ready(function () {
                    $.ajax({
                        type: "GET",
                        url: "http://localhost:8080/api/category",
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                        },
                        success: function (response) {
                            renderCategories(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error);
                        }
                    });
                });

            },
            error: function (xhr, status, error) {
                console.error('Error deleting category:', error);
                alert('Error deleting category. Please try again later.');
            }
        });
    });
}


$('#deleteCategoryButton').on('click', function () {
    categoryModal.style.display = "none";
});


function openEditModal(categoryId, categoryName) {
    $('#editCategoryId').val(categoryId);
    $('#editCategoryIdText').text(categoryId);
    $('#editCategoryName').val(categoryName);
    $('#editModal').show();
}


$('#confirmEditButton').click(function (event) {
    event.preventDefault();

    const categoryId = $('#editCategoryId').val();
    const newCategoryName = $('#editCategoryName').val();
    console.log(categoryId);
    console.log(newCategoryName);

    const updatedCategory = {
        name: newCategoryName
    };

    $.ajax({
        type: 'PUT',
        url: 'http://localhost:8080/api/category/' + categoryId,
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        contentType: 'application/json',
        data: JSON.stringify(updatedCategory),
        success: function (response) {
            console.log('Category name updated successfully:', response);
            $('#editModal').hide();
            $(document).ready(function () {
                $.ajax({
                    type: "GET",
                    url: "http://localhost:8080/api/category",
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                    },
                    success: function (response) {
                        renderCategories(response);
                    },
                    error: function (xhr, status, error) {
                        console.error(error);
                    }
                });
            });
        },
        error: function (xhr, status, error) {
            console.error('Error updating category name:', error);
            alert('Error updating category name. Please try again later.');
        }
    });
});


const deleteEditButton = document.getElementById('deleteEditButton');

deleteEditButton.addEventListener('click', function () {
    editModal.style.display = 'none';

});



