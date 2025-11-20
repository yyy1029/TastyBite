
function showCart() {
    $("#cart").fadeIn();
}

function hideCart() {
    $("#cart").fadeOut();
}

$("#onCart").click(function () {
    showCart;
});

function proUp(i, dom) {
    let root = $(dom).closest(".cart-body__footer");
    let count = root.find(".cart-body__price .cart-body__txt");

    if (parseInt(count.text()) === 99) {
        console.log("no more", window.cartList[i].num);
        return;
    }

    let addCount = new ShoppingCarObserver(count, window.cartList[i]);
    addCount.add();
}

function proDown(i, dom) {
    let root = $(dom).closest(".cart-body__footer");
    let count = root.find(".cart-body__price .cart-body__txt");

    if (parseInt(count.text()) === 0) {
        console.log("no less", window.cartList[i].num);
        return;
    }

    let subCount = new ShoppingCarObserver(count, window.cartList[i]);
    subCount.sub();
}


function getCartNum() {
    $("#cartNum")[0].textContent = window.cartList.length || 0;
}


function loadGoods() {
    if (window.cartList === undefined || window.cartList.length === 0) {
        $(".cart-body")[0].innerHTML = "";
        return;
    }
    $(".cart-body")[0].innerHTML = "";

    $.each(window.cartList, function (i, item) {
        let html = `<div class="cart-body__item">
            <div class="cart-body__img">
                <img src="${item.images}" alt="${item.name}">
            </div>
            <div class="cart-body__info">
                <div class="cart-body__title">${item.name}</div>
                <div class="cart-body__footer">
                    <div class="cart-body__sku">
                        <div class="cart-body__t">
                         ${item.tag.join(",")}
                        </div>
                        <div class="cart-body__p">
                            $${item.price}
                        </div>
                    </div>
                    <div class="cart-body__price">
                        <span class="cart-body__up" onclick="proUp(${i}, this)">+</span>
                        <span class="cart-body__txt"> ${item.num} </span>
                        <span class="cart-body__down" onclick="proDown(${i}, this)">-</span>
                    </div>
                </div>
            </div>
        </div>`;

        $(".cart-body").append(html);
    });

    computedPrice();

    window.localStorage.setItem('pay', JSON.stringify(window.cartList))
}

function ShoppingCarObserver(totalElement, data) {
    this.total = totalElement;
    this.count = parseInt(this.total.text());

    this.add = function () {
        this.count++;
        data.num = this.count;
        data.totalPrice = parseFloat(data.price) * this.count;
        this.total.text(this.count);
    };

    this.sub = function () {
        this.count--;
        data.num = this.count;
        data.totalPrice = parseFloat(data.price) * this.count;
        this.total.text(this.count);
        if (this.count == 0) {
            let narr = [...window.cartList]
            window.cartList = narr.filter(item => item.num != 0)
            loadGoods()
            computedPrice()
        }
    };
    computedPrice();
}

function computedPrice() {
    const total = cartList.reduce((acc, item) => acc + parseFloat(item.totalPrice), 0);
    $("#goodsMoney")[0].textContent = `$ ${total.toFixed(2)}`;
}

getCartNum();
loadGoods();

$("#clearCart").click(function () {
    window.cartList = [];
    loadGoods();
    computedPrice();
});


function showTag(data) {
    window.temporaryData = data;
    getIngredientList(data)
    $("#cart-tag").fadeIn();
}


function hideTag() {
    $("#cart-tag").fadeOut();
}

function confirmTag() {
    hideTag();
}


function addCart() {
    let checkboxes = document.getElementById("tag-type").querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked');
    let values = Array.prototype.map.call(checkboxes, function (checkbox) {
        return checkbox.value;
    });

    let existingCartItem = window.cartList.find((item) => item.id === window.temporaryData.id && JSON.stringify(item.tag) === JSON.stringify(values));

    if (existingCartItem) {
        existingCartItem.num += 1;
        existingCartItem.totalPrice = existingCartItem.num * parseFloat(window.temporaryData.price);
        addCartApi({ dishId: existingCartItem.id, quantity: existingCartItem.num, ingredients: values });
    } else {
        let newCartItem = { ...window.temporaryData, num: 1, tag: values, totalPrice: 1 * parseFloat(window.temporaryData.price) };
        window.cartList = [...window.cartList, newCartItem];
        addCartApi({ dishId: newCartItem.id, quantity: newCartItem.num, ingredients: newCartItem.tag });
    }

    loadGoods();
    confirmTag();
    showCart();
    getCartNum();
    setTimeout(() => {
        uncheckAllCheckboxes("tag-type");
        window.temporaryData = {};
    }, 500);
}


function uncheckAllCheckboxes(formId) {
    var form = document.getElementById(formId);
    if (form) {
        var checkboxes = form.getElementsByTagName("input");
        for (var i = 0; checkboxes[i]; i++) {
            if (checkboxes[i].type === "checkbox") {
                checkboxes[i].checked = false;
            }
        }
    }
}


function payShow() {
    payPrice();
    $("#cart-buy").fadeIn();
}

function payHide() {
    $("#cart-buy").fadeOut();
}


window.addEventListener("message", function (event) {
    if (event.data.close) {
        payHide();
    }
});



function addCartApi(data) {
    var jwt = localStorage.getItem('jwt');
    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/api/cart/add",
        contentType: "application/json",
        headers: {
            'Authorization': 'Bearer ' + jwt
        },
        data: JSON.stringify(data),
        success: function (response) {
            cartListApi();

        },
        error: function (xhr, status, error) {
            alert(xhr.status);
        },
    });
}


function cartListApi() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/cart",
        contentType: "application/json",
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
        },
        success: function (response) {
            console.log(response);
            // location.reload();
        },
        error: function (xhr, status, error) {
            alert(xhr.status);
        },
    });
}

function cartItemDelApi(id) {
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/api/cart_item/${id}/remove`,
        contentType: "application/json",
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
        },
        success: function (response) {
            cartListApi();
        },
        error: function (xhr, status, error) { },
    });
}

function cartEditApi(data) {
    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/api/cart_item/update",
        contentType: "application/json",
        data: JSON.stringify(data),
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
        },
        success: function (response) {
            console.log(response);
            location.reload();
        },
    });
}



var homePageDishList = [
    {
        id: 0,
        images: ['cart/assets/products/baked1.jpg'],
        description: 'Backed good is good',
        price: 11.99,
        name: 'Backed'
    }
]
function getHomeDishList() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/admin/dish/all",
        contentType: "application/json",
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
        },
        success: function (response) {
            console.log(response);
            window.homePageDishList = response;
            renderHomePageList()
        },
        error: function (xhr, status, error) {
            alert(xhr.status);
        },
    });
}


function payPrice() {

    let priceElement = document.getElementById("goodsMoney");

    let price = priceElement.textContent.replace("$", "").trim();


    let url = "./cart/onlyPayment/pay.html?price=" + price;

    window.location.href = url;
}

function  getIngredientApi(id) {
    return new Promise((r) => {
        $.ajax({
            type: "GET",
            url: `http://localhost:8080/api/dish/IngredientsMap/${id}`,
            contentType: "application/json",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
            },
            success: function (response) {
                r(response);
            },
            error: function (xhr, status, error) {
                alert(xhr.status);
            },
        });
    })

}


function getIngredientList(data) {
    let promises = []
    console.log(data)
    Promise.all([getIngredientApi(data.id)]).then(res => {
        renderIngrendientDom(res)
    })
}

function renderIngrendientDom(list) {

    console.log()
    document.getElementById('chengfenDom').innerHTML = ''
    // 对照数组
    let template = ''
    if (list[0].length != 0) {
        list[0].forEach(item => {
            let dom = `
        <div class="tag-type__item">
                            <div class="tag-type__label">${item.categoryName}</div>
                            <div class="tag-type__checkgroup">
                                ${item.items.map(ele => `<span><input type="checkbox" value="${ele.name}" /><em>${ele.name}</em></span>`).join('') }
                            </div>
                        </div>
`
            template += dom
        })
    }
    $('#chengfenDom').html(template)
}

function renderSwiperDom(list) {
    let doms = ''
    if (list.length != 0) {
        list.forEach(item => {
            let dom = `<li class="swiper-slide"><a href="#0" onclick="onChange('${item.name}')">${item.name}</a></li>`
            doms += dom
        })
    }
    $('#swiperDomList').html(doms)
}

var wrapperNum = []
function getCategoryList() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/category",
        contentType: "application/json",
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
        },
        success: function (response) {
            console.log(response);
            renderSwiperDom(response)
            wrapperNum = response
            // location.reload();
            getDishList(response[0].name)
        },
        error: function (xhr, status, error) {
            if (xhr.status === 500) {
                alert("Please log in to see our dishes.");
            } else {
                alert("An error occurred: " + xhr.status);
            }
        },
    });
}

function onChange(name) {
    getDishList(name)
}

function getDishList(category) {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/api/admin/dish/category/${category}`,
        contentType: "application/json",
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
        },
        success: function (response) {
            console.log(response);
            window.homePageDishList = response;
            renderHomePageList()
            // location.reload();
        },
        error: function (xhr, status, error) {
            if (xhr.status === 500) {
                alert("Please log in to see our dishes.");
            } else {
                alert("An error occurred: " + xhr.status);
            }
        },
    });
}
function renderHomePageList() {
    let homePageDishDom = document.getElementById('swiperWrapperDom');
    let categoryData = wrapperNum;
    let dishData = window.homePageDishList;

    homePageDishDom.innerHTML = '';


    categoryData.forEach(category => {

        let categoryDishes = dishData.filter(dish => dish.dishCategory.id === category.id);

        let dishListHTML = categoryDishes.map(dish => {
            return `<li>
          <div class="thumbnail covering">
              <a href="#">
                  <img src="${dish.images}" alt="">
              </a>
          </div>
          <div class="meta">
              <div class="catrate">
              <span class="cat"><a href="#">${dish.name}</a></span>
              <a href="#" class="like-btn" data-dishid="${dish.id}" onclick="toggleLike(event,${dish.id})">
              <i class="ri-heart-line empty-heart"></i>
              <i class="ri-heart-fill filled-heart" style="display: none;"></i>
              <span class="like-count">${dish.likes}</span>
              </a>
              </div>
              <h2><a href="#">${dish.description}</a></h2>
              <div class="price">
                  <strong class="current">$${dish.price}</strong>
              </div>
              <div class="buttons">
                  <button onclick='showTag(${JSON.stringify(dish)})'>Add to cart</button>
                  <a href="#" class="favourite" data-dishid="${dish.id}" onclick="toggleFavorite(event, ${dish.id})">
                        <i class="ri-star-line empty-star"></i>
                        <i class="ri-star-fill filled-star" style="display: none;"></i>
                    </a>
              </div>
          </div>
      </li>`;
        }).join('');


        let categoryHTML = `
      <div class="item swiper-slide">
          <ul>
              ${dishListHTML}
          </ul>
      </div>`;


        homePageDishDom.innerHTML += categoryHTML;
    });


    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/users/profile',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        success: function(response) {
            var userId = response.id;

            $.ajax({
                type: 'GET',
                url: `http://localhost:8080/api/users/${userId}/favorites`,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
                },
                success: function(favorites) {
                    updateFavoriteButtons(favorites);
                },
                error: function(xhr, status, error) {
                    console.error('Error:', error);
                    alert('Error. Please try again later.');
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


let likeStatus = {};
function updateLikeButton(dishId) {
    const emptyHeart = $(`.like-btn[data-dishid="${dishId}"] .empty-heart`);
    const filledHeart = $(`.like-btn[data-dishid="${dishId}"] .filled-heart`);

    if (likeStatus[dishId]) {
        emptyHeart.hide();
        filledHeart.show();
    } else {
        emptyHeart.show();
        filledHeart.hide();
    }
}

function toggleLike(event, dishId) {
    event.preventDefault();
    let isLiked = likeStatus[dishId] || false;
    isLiked = !isLiked;
    likeStatus[dishId] = isLiked;
    updateLikeButton(dishId);

    const method = isLiked ? 'PUT' : 'DELETE';

    $.ajax({
        type: method,
        url: 'http://localhost:8080/api/dish/' + dishId + '/like',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
        },
        success: function (response) {
            $(`.like-btn[data-dishid="${dishId}"] .like-count`).text(response.likes);
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
            alert('Error. Please try again later.');
            likeStatus[dishId] = !likeStatus[dishId];
            updateLikeButton(dishId);
        }
    });
}


function toggleFavorite(event, dishId) {
    event.preventDefault();
    const emptyStar = $(`.favourite[data-dishid="${dishId}"] .empty-star`);
    const filledStar = $(`.favourite[data-dishid="${dishId}"] .filled-star`);

    emptyStar.toggle();
    filledStar.toggle();

    const method = emptyStar.is(":visible") ? 'DELETE' : 'POST';

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/users/profile',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        success: function(response) {
            var userId = response.id;
            $.ajax({
                type: method,
                url: `http://localhost:8080/api/users/${userId}/favorites/${method === 'POST' ? 'add' : 'remove'}/${dishId}`,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
                },
                success: function(response) {
                    console.log(response);
                },
                error: function(xhr, status, error) {
                    console.error('Error:', error);
                    alert('Error. Please try again later.');
                    emptyStar.toggle();
                    filledStar.toggle();
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
function updateFavoriteButtons(favorites) {
    $('.favourite').each(function() {
        const dishId = $(this).data('dishid');
        const isFavorited = favorites.some(fav => fav.id === dishId);
        const emptyStar = $(this).find('.empty-star');
        const filledStar = $(this).find('.filled-star');
        if (isFavorited) {
            emptyStar.hide();
            filledStar.show();
        } else {
            emptyStar.show();
            filledStar.hide();
        }
    });
}

