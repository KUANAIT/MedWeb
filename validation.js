document.addEventListener("DOMContentLoaded", () => {

    const firstNameInput = document.getElementById("first-name");
    const lastNameInput = document.getElementById("last-name");
    const emailInput = document.getElementById("email-register");
    const passwordInput = document.getElementById("password-signup");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const registerForm = document.getElementById("registerForm");


    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

    const createErrorMessage = (input) => {
        const errorMessage = document.createElement("div");
        errorMessage.classList.add("error-message");
        errorMessage.style.color = "red";
        errorMessage.style.fontSize = "small"; // Set font size to small
        input.parentNode.insertBefore(errorMessage, input.nextSibling);
        return errorMessage;
    };


    const firstNameError = createErrorMessage(firstNameInput);
    const lastNameError = createErrorMessage(lastNameInput);
    const emailError = createErrorMessage(emailInput);
    const passwordError = createErrorMessage(passwordInput);
    const confirmPasswordError = createErrorMessage(confirmPasswordInput);


    const validateFields = () => {
        let isValid = true;

        if (firstNameInput.value.length < 3) {
            firstNameError.textContent = "First name must be at least 3 characters long.";
            isValid = false;
        } else {
            firstNameError.textContent = "";
        }

        if (lastNameInput.value.length < 3) {
            lastNameError.textContent = "Last name must be at least 3 characters long.";
            isValid = false;
        } else {
            lastNameError.textContent = "";
        }

        if (!emailInput.value.includes("@") || !emailInput.value.includes(".")) {
            emailError.textContent = "Please enter a valid email address.";
            isValid = false;
        } else {
            emailError.textContent = "";
        }

        if (localStorage.getItem(emailInput.value)) {
            emailError.textContent = "This email is already registered. Please use a different email.";
            isValid = false;
        }

        if (!passwordRegex.test(passwordInput.value)) {
            passwordError.textContent = "Password must be 8-15 characters long and include at least one uppercase letter, one digit, and one special character.";
            isValid = false;
        } else {
            passwordError.textContent = "";
        }

        if (confirmPasswordInput.value !== passwordInput.value) {
            confirmPasswordError.textContent = "Passwords do not match.";
            isValid = false;
        } else {
            confirmPasswordError.textContent = "";
        }

        return isValid;
    };


    [firstNameInput, lastNameInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => {
        input.addEventListener("blur", validateFields);
    });


    registerForm.addEventListener("submit", (event) => {
        if (!validateFields()) {
            event.preventDefault();
            alert("Please correct the errors before submitting.");
        } else {

            const user = {
                firstName: firstNameInput.value,
                lastName: lastNameInput.value,
                email: emailInput.value,
                password: passwordInput.value
            };


            localStorage.setItem(user.email, JSON.stringify(user));

            alert("Registration successful! Redirecting to your personal page...");
            // Uncomment the following line to redirect to a personal page after registration
            // window.location.href = "personal_page.html";
        }
    });


    const togglePasswordVisibility = (passwordField, toggleButton) => {
        toggleButton.addEventListener("click", () => {
            const isPasswordVisible = passwordField.getAttribute("type") === "text";
            passwordField.setAttribute("type", isPasswordVisible ? "password" : "text");
            toggleButton.textContent = isPasswordVisible ? "👁️" : "👁️‍🗨️";
        });
    };


    const createToggleBtn = (input) => {
        const toggleBtn = document.createElement("span");
        toggleBtn.textContent = "👁️";
        toggleBtn.style.cursor = "pointer";
        input.parentNode.appendChild(toggleBtn);
        return toggleBtn;
    };


    togglePasswordVisibility(passwordInput, createToggleBtn(passwordInput));
    togglePasswordVisibility(confirmPasswordInput, createToggleBtn(confirmPasswordInput));
});
