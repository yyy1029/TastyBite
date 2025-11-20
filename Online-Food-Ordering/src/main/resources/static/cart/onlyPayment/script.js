document.getElementById("proceedBtn").addEventListener("click", function () {

  window.location.href = "../success/success.html";
});
//ajax
function selectPaymentMethod(element) {


  var paymentTypes = document.querySelectorAll('.type');
  paymentTypes.forEach(function (item) {
    item.classList.remove('selected');
  });

  element.classList.add('selected');
  alert("select successfully!")

}

function submitOrder() {
  let data = {
    deliveryAddress: $('#address').val(),
    // user: JSON.parse(localStorage.getItem('userInfo'))
  }
  console.log(JSON.stringify(data))
  $.ajax({
    type: "POST",
    url: "http://localhost:8080/api/order",
    contentType: "application/json",
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
    },
    data: JSON.stringify(data),
    success: function (response) {
      console.log('success')
      window.localStorage.setItem('pay', '')
      window.location.href = '../success/success.html'
    },
    error: function (xhr, status, error) {
      alert(xhr.status);
    },
  });
}

function toPay() {
  submitOrder()

  let parentDiv = document.querySelector(".selected");
  let childDivs = parentDiv.querySelectorAll("div");
  let secondDiv = childDivs[1];
  let paragraph = secondDiv.querySelector("p");
  let textContent = paragraph.textContent
  console.log(11111, paragraph.textContent);

  if (textContent) {
    fetch("http://localhost:8080/api/order/pay", {
      method: 'POST',
      body: JSON.stringify({
            "orderId": Math.floor(Math.random() * 100000),
            "paymentMethod": textContent == 'Pay with Credit Card' ? "WECHAT" : textContent == 'PAY WITH PAYPAL' ? "PAYPAL" : "WECHAT"
          }
      ),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
    }).then(res => {
      console.log(66666, res);
    }).catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  } else {
    alert("Please choose the payment method first")
  }


}

