
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



MealModal.style.display = "none";
const openModalButton = document.querySelector('.add_products');

const deleteModalButton = document.getElementById('deleteModalButton');
openModalButton.addEventListener("click", function () {
    MealModal.style.display = "block";

});

$('#deleteModalButton').on('click', function () {
    MealModal.style.display = "none";
});


function showDish(event) {
    event.preventDefault();
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/admin/dish/all",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('jwt')
        },
        success: function (response) {
            console.log("Dish:", response);
            createDishModal(response);
            AllDish = response;
            console.log(AllDish);
            $("#Dish-modal").show();

            $("#submit-Dish-btn").click(function () {
                $("#Dish-modal").hide();
            });
        },
        error: function (xhr, status, error) {
            console.error("Error fetching Dish:", error);
        }
    });
}


function createDishModal(Dish) {
    var modalContent = "<div class='modal-content'><h2>Dishes</h2><div class='Dish-list'>";

    for (var i = 0; i < Dish.length; i++) {
        if (i % 10 === 0) {
            modalContent += "<div class='Dish-row'>";
        }
        modalContent += "<button class='Dish-button' data-id='" + Dish[i].id + "'>" + Dish[i].name + "</button>";
        if ((i + 1) % 10 === 0 || (i + 1) === Dish.length) {
            modalContent += "</div>";
        }
    }

    modalContent += "</div><div class='button-group'>" +
        "<button id='submit-Dish-btn'>Submit</button>" +
        "<button id='back-Dish-btn'>Back</button>" +
        "</div></div>";

    $("#Dish-modal").html(modalContent);

    $("#Dish-modal").show();


    document.querySelectorAll(".Dish-button").forEach(button => {
        button.addEventListener("click", function () {
            button.classList.toggle("selected");
        });
    });

    document.getElementById("submit-Dish-btn").addEventListener("click", function () {
        const selectedDish = [];
        const DishId = [];
        document.querySelectorAll(".Dish-button.selected").forEach(button => {
            DishId.push(button.dataset.id);
            selectedDish.push(button.textContent);
        });

        console.log("data id ", DishId);
        SelectedDish = AllDish.filter(Dish => DishId.includes(Dish.id.toString()));
        console.log("SelectedDish for back end", SelectedDish);
        console.log("Selected Dishes:", selectedDish);
        const selectedDishContainer = document.getElementById("selected-Dish");
        selectedDishContainer.innerHTML = "";

        selectedDish.forEach(Dish => {
            const dishes = document.createElement("div");

            dishes.textContent = Dish;
            selectedDishContainer.appendChild(dishes);
        });

        const clearIcon = document.createElement("span");
        clearIcon.classList.add("material-symbols-outlined");
        clearIcon.textContent = "delete_forever";
        clearIcon.style.cursor = "pointer";

        clearIcon.addEventListener("click", function () {
            selectedDishContainer.innerHTML = "";
            const header = document.createElement("h4");
            header.textContent = "Selected Dishes";
            selectedDishContainer.appendChild(header)
            selectedDishContainer.appendChild(clearIcon);
        });

        selectedDishContainer.appendChild(clearIcon);

    });
    document.getElementById("back-Dish-btn").addEventListener("click", function () {
        $("#Dish-modal").hide();
    });
}


function addNewMeal(event) {
    event.preventDefault();
    let data = convertToJavaScriptJSON();
    $.ajax({
        url: 'http://localhost:8080/api/admin/mealDeal/create',
        type: 'POST',
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(data),
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('jwt')
        },
        crossDomain: true,
        success: function (response) {
            console.log('New Set Meal added successfully:', response);
            MealModal.style.display = "none";
            getAllSetMeal();

        },
        error: function (xhr, status, error) {
            if (xhr.status === 400) {

                alert('The name already exists!');
            } else {

                console.error(error);
            }
        }
    });
}

function convertToJavaScriptJSON() {
    let selectedDishObjects = SelectedDish.map(function (dish) {
        return {
            "id": dish.id,
            "name": dish.name,
            "price": dish.price
        };
    });
    console.log("selectedDishObjects", selectedDishObjects);


    return {
        "name": $("#food-name").val(),
        "discount": parseFloat($("#Discount").val()),
        "dishes": selectedDishObjects
    };
}

function formatDiscount(discount) {

    let percentage = (discount * 100).toFixed(1);

    return percentage + '%';
}

document.addEventListener('DOMContentLoaded', function () {
    getAllSetMeal();
});
function SetMealCardLoad(SetMeal) {
    const CardsContainer = document.querySelector('.food_cards');
    CardsContainer.innerHTML = '';
    SetMeal.forEach(function (SetMeal) {

        let formattedDiscount = formatDiscount(SetMeal.discount);
        console.log(formattedDiscount);

        const newFoodCard = document.createElement('div');
        newFoodCard.classList.add('food_card');
        newFoodCard.innerHTML = `
                <table>
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Dish Items</th>
                        <th>Price</th>
                        <th>Discount</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                         
                            <td>${SetMeal.id}</td>
                            <td>${SetMeal.name}</td>
                            <td class="dishes">
                                <ul>
                                    ${SetMeal.mealDealDishes.map(dish => `<li>${dish.name}</li>`).join('')}
                                </ul>
                            </td>
                            <td>${SetMeal.price}</td>
                            <td>${formattedDiscount}</td>
                            <td class="action">
                                <a href="javascript:;" class="edit-button" onclick="onEdit(${SetMeal.id})">
                                    <span class="material-symbols-outlined">edit</span>
                                </a>
                                <a href="javascript:;" class="delete-button" onclick="onDelete(${SetMeal.id})">
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

function getAllSetMeal() {
    $.ajax({
        url: 'http://localhost:8080/api/admin/mealDeal/all',
        type: 'GET',
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('jwt')
        },
        success: function (response) {
            console.log('All SetMeal retrieved successfully:', response);
            allDishList = response;
            allDishList.forEach(function (mealDeal) {
                $.ajax({
                    url: `http://localhost:8080/api/mealDeal/${mealDeal.id}/totalPrice`,
                    type: 'GET',
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem('jwt')
                    },
                    success: function (totalPrice) {
                        mealDeal.totalPrice = totalPrice; // Append total price to meal deal data
                        mealDeal.price = totalPrice * (1 - mealDeal.discount);
                    },
                    error: function (xhr, status, error) {
                        console.error('Error retrieving total price:', error);
                    }
                });
            });
            SetMealCardLoad(allDishList);
            console.log(allDishList);
        },
        error: function (xhr, status, error) {
            console.error('Error retrieving all dishes:', error);

        }
    });
}


function onDelete(mealDealId) {

    $.ajax({
        url: `http://localhost:8080/api/admin/mealDeal/${mealDealId}`,
        type: 'DELETE',
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('jwt')
        },
        success: function (response) {
            console.log('Meal deal deleted successfully:', response);
            location.reload(true); 
            getAllSetMeal();
        },
        error: function (xhr, status, error) {
            console.error('Error deleting meal deal:', error);
            alert("Error deleting meal deal!");
        }
    });
}

editModal.style.display = "none";

function onEdit(mealDealId) {

    editModal.style.display = "block";
    $('#editId').val(mealDealId);
    $('#editIdText').text(mealDealId);


}

$('#deleteButton').on('click', function () {
    editModal.style.display = "none";
});


function updateNewMeal(event) {
    event.preventDefault();
    const mealDealId = $('#editId').val();
    console.log(mealDealId);


    const newName = $('#name').val();
    const newDiscount = $('#discount').val();
    console.log("New name:", newName);
    console.log("New discount:", newDiscount);


    const updatedData = {
        name: newName,
        discount: parseFloat(newDiscount)
    };


    $.ajax({
        url: `http://localhost:8080/api/admin/mealDeal/` + mealDealId + `/update`,
        type: 'PUT',
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(updatedData),
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('jwt')
        },
        success: function (response) {
            console.log('Meal deal updated successfully:', response);

            getAllSetMeal(response);

            editModal.style.display = "none";
        },
        error: function (xhr, status, error) {
            console.error('Error updating meal deal:', error);
            alert("Error updating meal deal!");
        }
    });
}

