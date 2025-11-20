
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

const openModalButton = document.querySelector('.add_products');

const ingredientModal = document.getElementById('ingredientModal');
const categoryModal = document.getElementById('categoryModal');

const confirmingredientButton = document.getElementById('confirmingredientButton');

const deleteingredientButton = document.getElementById('deleteingredientButton');

const confirmCategoryButton = document.getElementById('confirmCategoryButton');

const deleteCategoryButton = document.getElementById('deleteCategoryButton');

ingredientModal.style.display = "none";
categoryModal.style.display = "none";

openModalButton.addEventListener("click", function () {
    categoryModal.style.display = "block";

});


deleteingredientButton.addEventListener('click', function () {
    document.getElementById('items').value = '';
    ingredientModal.style.display = 'none';

});

deleteCategoryButton.addEventListener('click', function () {
    document.getElementById('categoryName').value = '';
    categoryModal.style.display = 'none';

});



$('#confirmCategoryButton').on('click', function () {
    console.log("Confirm button clicked");
    event.preventDefault();
    event.stopPropagation();

    var CategoryName = $('#CategoryName').val().trim();
    if (CategoryName) {

        var Category = {
            "name": CategoryName
        };
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/api/admin/ingredient/category",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            contentType: "application/json",
            data: JSON.stringify(Category),
            success: function (response) {
                newTable = '<div class="category">' +
                    '<table>' +
                    '<thead>' +
                    '<tr>' +
                    '<th>ID</th>' +
                    '<th>Category Name</th>' +
                    '<th>Item ID</th>' +
                    '<th>Item Name</th>' +
                    '<th>Availability</th>' +
                    '<th>Action</th>' +
                    '<th></th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody>' +
                    '<tr>' +
                    '<td>' + response.id + '</td>' +
                    '<td>' + response.name + '</td>' +
                    '</tr>';

                newTable += '<tr>' +
                    '<td colspan="6"></td>' +
                    '<td><div class="items add_item"><div><span class="material-symbols-outlined">add</span></div></td>' +
                    '</tr>';

                newTable += '</tbody></table></div>';



                var tempElement = document.createElement('div');
                tempElement.innerHTML = newTable.trim();
                var newTableElement = tempElement.firstChild;

                var ingredientContainer = document.querySelector('.ingredients');
                ingredientContainer.appendChild(newTableElement);

                $(document).ready(function () {

                    $.ajax({
                        type: "GET",
                        url: "http://localhost:8080/api/admin/ingredient/categories",
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

                categoryModal.style.display = "none";
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
        alert('Please fill the ingredient category name!');
    }
});



$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/admin/ingredient/categories",
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

    $('.ingredients').empty();

    categories.forEach(function (category) {
        var newTable = '<div class="category">' +
            '<table>' +
            '<thead>' +
            '<tr>' +
            '<th>ID</th>' +
            '<th>Category Name</th>' +
            '<th>Ingredient ID</th>' +
            '<th>Ingredient Name</th>' +
            '<th>Availability</th>' +
            '<th>Action</th>' +
            '<th></th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';



        newTable += '<tr>' +
            '<td rowspan="9999">' + category.id + '</td>' +
            '<td rowspan="9999" class="category-name">' + category.name + '</td>' +
            '</tr>';

        newTable += '<tr>' +
            '<td colspan="6"></td>' +
            '<td rowspan="9999" class="action">' +
            '<a href="#" class="edit-button"><span class="material-symbols-outlined">edit</span></a>' +
            '<div class="items add_item">' +
            '<div><span class="material-symbols-outlined">add</span></div>' +
            '</div>' +
            '<a href="#" class="delete-button">' +
            '<span class="material-symbols-outlined">delete</span>' +
            '</a>' +
            '</td>' +
            '</tr>';



        newTable += '</tbody></table></div>';

        $('.ingredients').append(newTable);



        $.ajax({
            type: "GET",
            url: "http://localhost:8080/api/admin/ingredient/" + category.id + "/category",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            success: function (response) {
                var categoryContainer = $('.ingredients').find('.category-name').filter(function () {
                    return $(this).text().trim() === category.name;
                }).closest('.category');


                console.log(response);
                if (response.ingredients && response.ingredients.length > 0) {
                    response.ingredients.forEach(function (ingredient) {
                        var stockStatus = ingredient.stoke ? 'instock' : 'outofstock';
                        console.log(ingredient.id);
                        console.log(ingredient.name);
                        console.log(ingredient.stoke);
                        var newRow = '<tr>' +
                            '<td>' + ingredient.id + '</td>' +
                            '<td>' + ingredient.name + '</td>' +
                            '<td class="availability ' + stockStatus + '">' +
                            '<a href="#" class="stock-link">' + (ingredient.stoke ? 'IN STOCK' : 'OUT OF STOCK') + '</a>' +
                            '</td>' +
                            '<td class="action">' +
                            '<a href="#" class="deletebutton">' +
                            '<span class="material-symbols-outlined">delete</span>' +
                            '</a>' +
                            '</td>' +
                            '</tr>';

                        categoryContainer.find('tbody').append(newRow);


                    });
                } else {

                    console.log("No ingredients found.");
                }








                $('.ingredients').off('click', '.stock-link').on('click', '.stock-link', function (event) {
                    event.preventDefault();
                    const itemId = $(this).closest('tr').find('td:first').text().trim();
                    $.ajax({
                        type: 'PUT',
                        url: 'http://localhost:8080/api/admin/ingredient/' + itemId + '/stoke',
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                        },
                        success: function (response) {

                            console.log('Stock status updated successfully.');
                            $(document).ready(function () {
                                $.ajax({
                                    type: "GET",
                                    url: "http://localhost:8080/api/admin/ingredient/categories",
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

                            console.error('Error updating stock status:', error);
                        }
                    });
                });



                $('.edit-button').off().click(function (event) {
                    event.preventDefault();
                    const categoryId = $(this).closest('.category').find('td:first').text().trim();
                    const categoryName = $(this).closest('.category').find('.category-name').text().trim();

                    console.log(categoryId);
                    console.log(categoryName);

                    if (categoryId) {
                        openEditModal(categoryId, categoryName);
                    } else {
                        console.error('Invalid categoryId:', categoryId);

                        alert('Invalid categoryId. Please try again later.');
                    }

                });

                $('.deletebutton').off().click(function (event) {
                    event.preventDefault();
                    const itemId = $(this).closest('tr').find('td:first').text().trim();
                    console.log(itemId);

                    $.ajax({
                        type: 'DELETE',
                        url: 'http://localhost:8080/api/admin/ingredient/delete/item/' + itemId,
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                        },
                        success: function (response) {

                            console.log('Item deleted successfully:', response);
                            $(this).closest('.category').remove();

                            $(document).ready(function () {
                                $.ajax({
                                    type: "GET",
                                    url: "http://localhost:8080/api/admin/ingredient/categories",
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

                            alert('Error deleting ingredient. The ingredient may be added in a dish. Please try again later.');
                        }
                    });


                });

                $('.items').click(function (event) {
                    event.preventDefault();
                    const categoryId = $(this).closest('.category').find('td:first').text().trim();
                    console.log(categoryId);


                    if (categoryId) {
                        openitemModal(categoryId);
                    } else {
                        console.error('Invalid categoryId:', categoryId);

                        alert('Invalid categoryId. Please try again later.');
                    }

                });




                $('.delete-button').off().click(function (event) {
                    event.preventDefault();
                    const categoryId = $(this).closest('.category').find('td:first').text().trim();
                    console.log(categoryId);


                    $.ajax({
                        type: 'DELETE',
                        url: 'http://localhost:8080/api/admin/ingredient/delete/' + categoryId,
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                        },
                        success: function (response) {

                            console.log('Category deleted successfully:', response);
                            $(this).closest('.category').remove();
                            $(document).ready(function () {


                                $.ajax({
                                    type: "GET",
                                    url: "http://localhost:8080/api/admin/ingredient/categories",
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

                            alert('Error deleting category. Please try again later. The category may be added in the dish.');
                        }
                    });
                });

            },
            error: function (xhr, status, error) {

                console.error(error);
            }
        });

    });
}


$('#deleteEditButton').on('click', function () {
    editModal.style.display = "none";
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
        url: 'http://localhost:8080/api/admin/ingredient/category/' + categoryId,
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
                    url: "http://localhost:8080/api/admin/ingredient/categories",
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




function openitemModal(categoryId) {

    $('#CategoryId').val(categoryId);
    $('#CategoryIdText').text(categoryId);
    $('#ingredientModal').show();
}



$('#confirmingredientButton').on('click', function () {
    console.log("Confirm button clicked");
    event.preventDefault();
    event.stopPropagation();
    const categoryId = $('#CategoryId').val();
    console.log(categoryId);

    const itemName = $('#items').val();
    console.log(itemName);

    if (itemName && categoryId) {
        var newItem = {
            "categoryId": categoryId,
            "name": itemName
        };


        $.ajax({
            type: "POST",
            url: "http://localhost:8080/api/admin/ingredient/create",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            contentType: "application/json",
            data: JSON.stringify(newItem),
            success: function (response) {
                ingredientModal.style.display = "none";

                console.log(response);

                $(document).ready(function () {

                    $.ajax({
                        type: "GET",
                        url: "http://localhost:8080/api/admin/ingredient/categories",
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

                    alert('Ingredient name already exists!');
                } else {

                    console.error(error);
                }
            }
        });
    } else {
        alert('Please select a category and enter the item name!');
    }
});






