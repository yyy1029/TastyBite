
//rating
function sendRating(d1, d2) {
    fetch(`http://localhost:8080/api/order/ratings/save`, {
        method: 'POST',
        body: JSON.stringify({
            "orderId": d2,
            "rating": d1
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            alert("Rating success！")
            getLists()
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    console.log("Rating", d1, d2);
}
getLists()
function getLists() {
    fetch("http://localhost:8080/api/order/user", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Lists", data);
            document.querySelector("#lists").innerHTML = ""
            if (data && data.length > 0) {
                data.forEach(item => {
                    let starsHTML = '';
                    for (let i = 0; i < item.rating; i++) {
                        starsHTML += `<span onclick="sendRating(${i + 1},${item.id})" class="star material-symbols-outlined">★</span>`;
                    }
                    for (let i = item.rating; i < 5; i++) {
                        starsHTML += `<span  onclick="sendRating(${i + 1},${item.id})"   class="star material-symbols-outlined">☆</span>`;
                    }
                    document.querySelector("#lists").innerHTML += `
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.orderStatus}</td>
                        <td>${item.createdAt}</td>
                        <td>
                            <span class="star-rating" data-rating="0">
                              ${starsHTML}
                            </span>
                        </td>
                        <td class="action"">
                            <label for="display" class="display-btn">
                                <span onclick="del2(${item.id})" class="material-symbols-outlined">comment</span>
                            </label>
                            <a onclick="del(${item.id})" href="#" class="delete-button"onclick="del(item.id)">
                                <span class="material-symbols-outlined">delete</span>
                            </a>
                        </td>
                    </tr>`
                })

            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

getLists()


function del(id) {
    console.log("Delete", id)
    fetch(`http://localhost:8080/api/order/ratings/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("delete", data);
            alert("Success！")
            getLists()


        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
var ids = null
function del2(id) {
    console.log(666, id);
    ids = id
    document.querySelector(".container2").style.display = "block"
    document.querySelector("#comment").value = ""
}
