function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateEmailOnInput() {
    let emailInput = document.getElementById('email').value;
    let isValid = validateEmail(emailInput);
    let emailValidate = document.getElementById('emailValidate');
    
    if (emailInput.trim() === "") {
        emailValidate.style.display = "none";
    } else {
        emailValidate.style.display = "block";
        if (isValid) {
            emailValidate.textContent = "Valid";
            emailValidate.classList.remove('invalid');
            emailValidate.classList.add('valid');
        } else {
            emailValidate.textContent = "Invalid";
            emailValidate.classList.remove('valid');
            emailValidate.classList.add('invalid');
        }
    }
}

function validateEmailOnInputRegister() {
    let emailInput = document.getElementById('Remail').value;
    let isValid = validateEmail(emailInput);
    let emailValidate = document.getElementById('emailValidateRegister');
    
    if (emailInput.trim() === "") {
        emailValidate.style.display = "none";
    } else {
        emailValidate.style.display = "block";
        if (isValid) {
            emailValidate.textContent = "Valid";
            emailValidate.classList.remove('invalid');
            emailValidate.classList.add('valid');
        } else {
            emailValidate.textContent = "Invalid";
            emailValidate.classList.remove('valid');
            emailValidate.classList.add('invalid');
        }
    }
}

function checkPasswordStrengthRegister() {
    var password = document.getElementById("Rpassword").value;
    var strengthBar = document.getElementById("passwordStrengthRegister");
    var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])");
    var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9])))");
    if (password.trim() === "") {
        strengthBar.style.display = "none";
    } else {
        strengthBar.style.display = "block";
        if (strongRegex.test(password)) {
            strengthBar.innerHTML = "Strong";
            strengthBar.className = "register-password-strength strong";
        } else if (mediumRegex.test(password)) {
            strengthBar.innerHTML = "Medium";
            strengthBar.className = "register-password-strength medium";
        } else {
            strengthBar.innerHTML = "Weak";
            strengthBar.className = "register-password-strength weak";
        }
    }
}





function checkPasswordStrength() {
    var password = document.getElementById("password").value;
    var strengthBar = document.getElementById("passwordStrength");
    var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])");
    var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9])))");
    if (password.trim() === "") {
        strengthBar.style.display = "none"; 
    } else {
        strengthBar.style.display = "block"; 

        if (strongRegex.test(password)) {
            strengthBar.innerHTML = "Strong";
            strengthBar.className = "password-strength strong";
        } else if (mediumRegex.test(password)) {
            strengthBar.innerHTML = "Medium";
            strengthBar.className = "password-strength medium";
        } else {
            strengthBar.innerHTML = "Weak";
            strengthBar.className = "password-strength weak";
        }
    }
    
}


