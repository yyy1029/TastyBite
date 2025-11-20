
function myMenuFunction() {
    var i = document.getElementById("navMenu");

    if(i.className === "nav-menu") {
        i.className += " responsive";
    } else {
        i.className = "nav-menu";
    }
   }


var a = document.getElementById("loginBtn");
    var b = document.getElementById("registerBtn");
    var x = document.getElementById("login");
    var y = document.getElementById("register");

    function login() {
        x.style.left = "4px";
        y.style.right = "-520px";
        a.className += " white-btn";
        b.className = "btn";
        x.style.opacity = 1;
        y.style.opacity = 0;
    }



    function register() {
        x.style.left = "-510px";
        y.style.right = "5px";
        a.className = "btn";
        b.className += " white-btn";
        x.style.opacity = 0;
        y.style.opacity = 1;

}


function selectRole(role, button) {

    var roleButtons = document.querySelectorAll('.role-btn');

   
    roleButtons.forEach(function(btn) {
       
        if (btn === button) {
            btn.classList.add('selected');
            btn.dataset.role = role;
        } else {
            btn.classList.remove('selected');
        }
    });

   
    selectedRole = role;
}

//Register
var registerButton = document.getElementById('registerButton');
registerButton.addEventListener('click', function() {
   
    var fullname = document.getElementById('fullname').value;
    var email = document.getElementById('Remail').value;
    var password = document.getElementById('Rpassword').value;
    var selectedButton = document.querySelector('.role-btn.selected');
    var role =selectedButton.dataset.role;

    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    var passwordStrength = document.getElementById("passwordStrengthRegister").className;
    if (passwordStrength.includes("weak")) {
        alert("Please ensure the password is of medium or strong strength.");
        return;
    }
    console.log("Full Name:", fullname);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Role:", role);

   
    let data = {
        fullName: fullname,
        email: email,
        password: password,
        role: role
    };

     $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/auth/register',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(response) {
            console.log(response);
            if (response.message === "Register Success") {
               
                console.log(response);
                localStorage.setItem('jwt', response.jwt);
                location.reload();
                window.location.href = '../../Homepage.html';
            }
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
            if (xhr.status === 500 && xhr.responseText.includes("Email is already be used by another account!")) {
                alert("Email is already registered!"); 
            } else {
                alert("An error occurred while processing your request. Please try again later.");
            }
        }
    });
});


//sign in
var loginButton = document.getElementById('submit-login');
loginButton.addEventListener('click', function() {
    
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;


    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    var passwordStrength = document.getElementById("passwordStrength").className;
    if (passwordStrength.includes("weak")) {
        alert("Please ensure the password is of medium or strong strength.");
        return;
    }

    let data = {
        email: email,
        password: password
    };

   
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/auth/sign_in', 
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(response) {
            console.log(response); 
            localStorage.setItem('jwt', response.jwt);
            location.reload();
            window.location.href = '../../Homepage.html';
           
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
          
            if (xhr.status === 403) {
                alert("Username does not exist or password is incorrect. Please try again.");
            } else {
                alert("An error occurred while processing your request. Please try again later.");
            }
        }
    });
});

