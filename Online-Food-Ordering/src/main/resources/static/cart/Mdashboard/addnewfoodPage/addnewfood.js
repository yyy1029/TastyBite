
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

/**********ingredients*************/
function showIngredient(event) {

    event.preventDefault();
    // Send a query request to get ingredient data
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/admin/ingredient/all",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('jwt')
        },
        crossDomain: true,
        success: function (response) {
            console.log("Ingredients:", response);
            createIngredientsModal(response);
            AllIngredients = response;
            console.log(AllIngredients);
            // Display mimicry box
            $("#ingredients-modal").show();

            $("#submit-ingredients-btn").click(function () {
                // Close the mimicry window
                $("#ingredients-modal").hide();
            });
        },
        error: function (xhr, status, error) {
            // Processing logic when obtaining component data fails
            console.error("Error fetching ingredients:", error);
        }
    });
}


//ingredients All logic in the mimicry window
function createIngredientsModal(ingredients) {

    var modalContent = "<div class='modal-content'><h2>Ingredients</h2><div class='ingredient-list'>";
    // Iterate through the ingredient data, creating a button for each ingredient
    for (var i = 0; i < ingredients.length; i++) {
        if (i % 10 === 0) {
            modalContent += "<div class='ingredient-row'>";
        }
        modalContent += "<button class='ingredient-button' data-id='" + ingredients[i].id + "'>" + ingredients[i].name + "</button>";
        if ((i + 1) % 10 === 0 || (i + 1) === ingredients.length) {
            modalContent += "</div>";
        }
    }

    modalContent += "</div><div class='button-container'>" +
        "<button id='submit-ingredients-btn'>Submit</button>" +
        "<button id='back-ingredients-btn'>Back</button>" +
        "</div></div>";

    $("#ingredients-modal").html(modalContent);

    $("#ingredients-modal").show();

    document.querySelectorAll(".ingredient-button").forEach(button => {
        button.addEventListener("click", function () {
            button.classList.toggle("selected");
        });
    });

    document.getElementById("submit-ingredients-btn").addEventListener("click", function () {

        const selectedIngredients = [];
        const ingredientId = [];
        document.querySelectorAll(".ingredient-button.selected").forEach(button => {
            ingredientId.push(button.dataset.id);
            selectedIngredients.push(button.textContent);
        });

        console.log("data id ", ingredientId);
        SelectedIngredients = AllIngredients.filter(ingredient => ingredientId.includes(ingredient.id.toString()));
        console.log("SelectedIngredients for back end", SelectedIngredients);
        console.log("Selected Ingredients:", selectedIngredients);
        const selectedIngredientsContainer = document.getElementById("selected-ingredients");
        selectedIngredientsContainer.innerHTML = "";

        selectedIngredients.forEach(ingredient => {
            const ingredientItem = document.createElement("div");

            ingredientItem.textContent = ingredient;
            selectedIngredientsContainer.appendChild(ingredientItem);
        });

        const clearIcon = document.createElement("span");
        clearIcon.classList.add("material-symbols-outlined");
        clearIcon.textContent = "delete_forever";
        clearIcon.style.cursor = "pointer";

        clearIcon.addEventListener("click", function () {
            selectedIngredientsContainer.innerHTML = "";
            const header = document.createElement("h4");
            header.textContent = "Selected ingredients";
            selectedIngredientsContainer.appendChild(header)
            selectedIngredientsContainer.appendChild(clearIcon);
        });

        selectedIngredientsContainer.appendChild(clearIcon);

    });

    document.getElementById("back-ingredients-btn").addEventListener("click", function () {
        $("#ingredients-modal").hide();
    });

}


function showCategory(event) {
    event.preventDefault();

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/category",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('jwt')
        },
        success: function (response) {
            console.log("Categories:", response);
            displayCategories(response);
            $("#categoryModal").show();
        },
        error: function (xhr, status, error) {
            console.error("Error fetching categories:", error);
        }
    });
}

function displayCategories(categories) {
    const categoryList = document.querySelector("#categoryModal .modal-content2");
    categoryList.innerHTML = "";

    categories.forEach(category => {
        const categoryButton = document.createElement("button");

        categoryButton.appendChild(document.createTextNode(category.name));
        categoryButton.classList.add("category-button");
        categoryButton.dataset.categoryId = category.id;
        categoryButton.addEventListener("click", function () {
            categoryButton.classList.add("selected");
            SelectedCategory = category;
            console.log("selected category for back end", category);
            console.log(category);
            const categoryName = category.name;
            const selectedCategoryContainer = document.getElementById("selected-category");
            selectedCategoryContainer.innerHTML = `<h4>${categoryName}</h4>`;
            categoryList.querySelectorAll(".category-button").forEach(button => {
                button.classList.remove("selected");
            });
            const modal = document.getElementById("categoryModal");
            modal.style.display = "none";
        });
        categoryList.appendChild(categoryButton);
    });

    const spanIcon = document.createElement("span");
    spanIcon.classList.add("material-symbols-outlined");
    spanIcon.id = "cancelBtn";
    spanIcon.textContent = "cancel";

    const cancelButton = document.createElement("button");
    cancelButton.appendChild(spanIcon);
    cancelButton.addEventListener("click", function () {
        const modal = document.getElementById("categoryModal");
        modal.style.display = "none";
    });

    categoryList.appendChild(cancelButton);

}


/**create image**/
function createImage(imageFile, callback) {
    if (imageFile) {
        let formData = new FormData();
        formData.append('file', imageFile);

        console.log('Selected file:', imageFile);

        $.ajax({
            url: 'http://localhost:8080/api/upload',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            success: function (response) {
                console.log('Image created successfully! URL: ', response);
                callback(response);
            },
            error: function (xhr, status, error) {
                console.error('Error creating image:', error);
            }
        });
    } else {
        console.error('No file selected.');
    }
}


//add food
function addNewDish(event) {
    event.preventDefault();
    let imageFile = document.getElementById('food-image');
    let image = imageFile.files[0];
    createImage(image, function (imageUrl) {
        let data = convertToJavaScriptJSON(imageUrl);
        $.ajax({
            url: 'http://localhost:8080/api/admin/dish/create',
            type: 'POST',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify(data),
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            crossDomain: true,
            success: function (response) {
                console.log('New dish added successfully:', response);
                alert("New Dish Add Success!");
                window.location.href = `/cart/Mdashboard/menuPage/menuPage.html`;
            },
            error: function (xhr, status, error) {
                console.error('Error adding new dish:', error);
                alert("Error adding new dish !");
            }
        });
    });
}


function convertToJavaScriptJSON(imageUrl) {
    let selectedIngredientsObjects = SelectedIngredients.map(function (ingredient) {
        return {
            "id": ingredient.id,
            "name": ingredient.name,
            "stock": ingredient.stock
        };
    });
    console.log("selectedIngredientsObjects", selectedIngredientsObjects);

    let selectedCategoryObject = {
        "id": SelectedCategory.id,
        "name": SelectedCategory.name
    };

    console.log("selectedCategoryObject", selectedCategoryObject);

    return {
        "name": $("#food-name").val(),
        "description": $("#food-description").val(),
        "price": parseFloat($("#food-price").val()),
        "category": selectedCategoryObject,
        "images": imageUrl,
        "ingredientItems": selectedIngredientsObjects
    };
}

