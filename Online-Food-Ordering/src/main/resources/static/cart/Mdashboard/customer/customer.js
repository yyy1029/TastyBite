
const sideMenu = document.querySelector('aside');
const menuBtn = document.querySelector("#menu_bar");
const closeBtn = document.querySelector("#close_bar");
const themeToggler = document.querySelector('.theme-toggler');
let resizeTimer;


function handleResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
        sideMenu.style.display = window.innerWidth <= 786 ? "none" : "block";
    }, 200);
}

function closeModal() {
    var modal = document.getElementById('orderDetailsModal');
    if (modal) {
        modal.style.display = 'none';
    }
}


document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('keyup', function () {
        const searchText = searchInput.value.toLowerCase();
        document.querySelectorAll('.recent_order tbody tr').forEach(row => {
            const visible = row.children[0].textContent.toLowerCase().includes(searchText) ||
                row.children[1].textContent.toLowerCase().includes(searchText);
            row.style.display = visible ? '' : 'none';
        });
    });

    window.addEventListener('resize', handleResize);
    handleResize();

    menuBtn.addEventListener('click', () => sideMenu.style.display = "block");
    closeBtn.addEventListener('click', () => sideMenu.style.display = "none");
    themeToggler.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme-variables');
        themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
        themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
    });

    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('update-status-button')) {
            const orderId = event.target.closest('div').dataset.orderId;
            const newStatus = prompt("Enter the new status:");
            if (newStatus) {
                updateOrderStatus(orderId, newStatus);
            }
        } else if (event.target.id === 'exportButton') {
            exportToCSV();
        }
    });

    getOrderHistory();

});


function getOrderHistory() {
    const xhr = new XMLHttpRequest();
    const url = new URL('/api/admin/order', window.location.origin);

    xhr.open('GET', url.href, true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('jwt'));
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            const orders = JSON.parse(xhr.responseText);
            updateOrderHistoryTable(orders);
            console.log(orders);
        } else {
            console.error("Failed to fetch order history: ", xhr.responseText);
            alert("Failed to fetch order history: " + xhr.statusText);
        }
    };
    xhr.onerror = function () {
        console.error('Network request failed');
        alert('Network request failed');
    };

    console.log(xhr);
    xhr.send();
}


function updateOrderHistoryTable(orders) {
    const tableBody = document.getElementById('ordersHistoryBody');
    tableBody.innerHTML = '';

    orders.forEach(order => {
        const row = `<tr>
                        <td>${order.id}</td>
                        <td>${order.createdAt}</td>
                        <td>$${order.totalPrice}</td>
                        <td>
                            <select id="statusSelect${order.id}">
                                <option value="PENDING" ${order.status === 'PENDING' ? 'selected' : ''}>Pending</option>
                                <option value="OUT_FOR_DELIVERY" ${order.status === 'OUT_FOR_DELIVERY' ? 'selected' : ''}>Out for Delivery</option>
                                <option value="DELIVERED" ${order.status === 'DELIVERED' ? 'selected' : ''}>Deliverd</option>
                                <option value="COMPLETED" ${order.status === 'COMPLETED' ? 'selected' : ''}>Completed</option>
                            </select>
                        </td>
                        
                        <td>
                            <button class="details-button" onclick="showDetails(${order.id})">Details</button>
                        </td>
                        
                     </tr>`;
        tableBody.innerHTML += row;

        const statusSelect = document.getElementById(`statusSelect${order.id}`);

        statusSelect.addEventListener('change', function () {
            const newStatus = this.value;
            updateOrderStatus(order.id, newStatus);
        });
    });
}


function updateOrderStatus(orderId, newStatus) {
    const url = `/api/admin/order/${orderId}/${newStatus}`;
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", url, true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('jwt'));
    xhr.setRequestHeader('Content-Type', 'application/json');
    const data = JSON.stringify({ orderId, reorderStatus: newStatus });
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Order updated:', JSON.parse(xhr.responseText));
        } else {
            console.error('Failed to update order status', xhr.status);
        }
    };
    xhr.onerror = function () {
        console.error('Network request failed');
    };
    xhr.send(data);
}


function showDetails(orderId) {
    orderId = parseInt(orderId);
    $.ajax({
        url: `http://localhost:8080/api/order/${orderId}`,
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },

        success: function (response) {
            console.log(response);
            const modal = document.getElementById('orderDetailsModal');
            modal.style.display = 'block';
            displayOrderDetails(response);
        },
        error: function (xhr, status, error) {
            console.error('Failed to fetch order details', error);
        }
    });
}


function displayOrderDetails(order) {
    const detailsContent = document.getElementById('detailsContent');
    detailsContent.innerHTML = '';

    const userName = order.customer.fullName;
    const userNameHTML = `<p>User Name: ${userName}</p>`;
    detailsContent.innerHTML += userNameHTML;

    const address = order.deliveryAddress.address;
    const addressHTML = `<p>Delivery Address: ${address}</p>`;
    detailsContent.innerHTML += addressHTML;

    const itemsHTML = order.items.map(item => {
        const dishName = item.dish.name;
        const quantity = item.quantity;
        const totalPrice = item.totalPrice;

        const ingredientsHTML = item.ingredients.map(ingredient => {
            return `<li>${ingredient}</li>`;
        }).join('');

        return `
            <div>
                <h5>Dish Name:</h5> <p>${dishName}</p>
                <h5>Dish Quantity:</h5> <p>${quantity}</p>
                <h5>Total Price:</h5><p> ${totalPrice}</p>
                <h5>Ingredients:</h5>
                <ul>${ingredientsHTML}</ul>
            </div>
        `;
    }).join('');
    const itemsContainerHTML = `<div><h3>Order Items:</h3>${itemsHTML}</div>`;
    detailsContent.innerHTML += itemsContainerHTML;
}


function exportToCSV() {
    const csv = [];
    const rows = document.querySelectorAll("table tr");
    for (let i = 0; i < rows.length; i++) {
        const row = [], cols = rows[i].querySelectorAll("td, th");
        for (let j = 0; j < cols.length; j++)
            row.push('"' + cols[j].innerText + '"');
        csv.push(row.join(","));
    }
    const csvFile = csv.join("\n");
    const blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "orders.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
