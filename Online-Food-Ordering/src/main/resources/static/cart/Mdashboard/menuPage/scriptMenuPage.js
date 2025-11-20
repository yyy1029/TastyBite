
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

function showMenuOnLargeScreens() {
    sideMenu.style.display = "block";
}

if (window.matchMedia("(max-width: 786px)").matches) {
    showMenuOnSmallScreens();
} else {
    showMenuOnLargeScreens();
}

window.addEventListener('resize', function () {
    if (window.innerWidth <= 786) {
        showMenuOnSmallScreens();
    } else {
        showMenuOnLargeScreens();
    }
});


const sidebarLinks = document.querySelectorAll('.sidebar a');


sidebarLinks.forEach(link => {

    link.addEventListener('click', function () {

        sidebarLinks.forEach(link => {
            link.classList.remove('active');
        });

        this.classList.add('active');
    });
});



const availableLinks = document.querySelectorAll('.available a');

availableLinks.forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();

        const availableCell = event.target.parentElement;

        if (availableCell.classList.contains('instock')) {
            availableCell.classList.remove('instock');
            availableCell.classList.add('outofstock');
            link.textContent = 'OUT OF STOCK';
        } else if (availableCell.classList.contains('outofstock')) {
            availableCell.classList.remove('outofstock');
            availableCell.classList.add('instock');
            link.textContent = 'IN STOCK';
        }
    });
});

const addProductsButton = document.querySelector('.add_products');
addProductsButton.addEventListener('click', function () {
    window.location.href = "/cart/Mdashboard/addnewfoodpage/addnewfood.html";
});



document.addEventListener('DOMContentLoaded', function () {
    getAllDishes();
});
function DishCardLoad(dishesList) {
    const CardsContainer = document.querySelector('.food_cards');
    CardsContainer.innerHTML = '';
    dishesList.forEach(function (dish) {
        const newFoodCard = document.createElement('div');
        newFoodCard.classList.add('food_card');
        newFoodCard.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Ingredients</th>
                        <th>Price</th>
                        <th>Available</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><img src="${dish.images}" alt=""></td>
                        <td>${dish.name}</td>
                        <td class="ingredients">
                            <ul>
                                ${dish.ingredients.map(ingredient => `<li>${ingredient.name}</li>`).join('')}
                            </ul>
                        </td>
                        <td>$${dish.price}</td>
                        <td class="available">${dish.available ? 'IN STOCK' : 'OUT OF STOCK'}</td>
                        <td class="action">
                            <a href="javascript:;" class="edit-button" onclick="onEdit(${dish.id})">
                                <span class="material-symbols-outlined">edit</span>
                            </a>
                            <a href="javascript:;" class="delete-button" onclick="onDelete(${dish.id})">
                                <span class="material-symbols-outlined">delete</span>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        `;
        CardsContainer.appendChild(newFoodCard);
    });
}
function getAllDishes() {
    $.ajax({
        url: 'http://localhost:8080/api/admin/dish/all',
        type: 'GET',
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('jwt')
        },
        success: function (response) {
            console.log('All dishes retrieved successfully:', response);
            allDishList = response;
            DishCardLoad(allDishList);
            console.log(allDishList);
        },
        error: function (xhr, status, error) {
            console.error('Error retrieving all dishes:', error);
            alert("There is no dish!");
        }
    });
}


function onEdit(id) {
    $('#dishMask').fadeIn();
    dishId = id;

    if (id) {
        $.ajax({
            type: "GET",
            url: `http://localhost:8080/api/admin/dish/${id}`,
            contentType: "application/json",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
            },
            success: function (response) {
                console.log(response);
                $('#Title').val(response.name);
                $('#Price').val(response.price);
                $('#Available').val(response.available);
            },
            error: function (xhr, status, error) {
                alert(xhr.status);
            },
        });
    }
}

function onClose() {
    $('#dishMask').fadeOut()
}

function onDelete(id) {
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/api/admin/dish/${id}`,
        contentType: "application/json",
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
        },
        success: function (response) {
            console.log(response);
            getAllDishes();
        },
        error: function (xhr, status, error) {
            if (xhr.status === 500) {
                alert("User has added this in their order! Don't delete it!");
            }
            alert(xhr.status);
        },
    });
}

function handleSubmit() {
    let data = {
        name: $('#Title').val(),
        price: $('#Price').val(),
        available: $('input[name="Size"]:checked').val() === 'In Stock'
    };

    $.ajax({
        type: "PUT",
        url: `http://localhost:8080/api/admin/dish/${dishId}`,
        contentType: "application/json",
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
        },
        data: JSON.stringify(data),
        success: function (response) {
            console.log(response);
            getAllDishes();
            onClose();
        },
    });
}