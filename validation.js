document.addEventListener("DOMContentLoaded", () => {
    const firstNameInput = document.getElementById("first-name");
    const lastNameInput = document.getElementById("last-name");
    const emailInput = document.getElementById("email-register");
    const passwordInput = document.getElementById("password-signup");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const registerForm = document.getElementById("registerForm"); // Add this line to select the form

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

    // Create error message elements
    const createErrorMessage = (input) => {
        const errorMessage = document.createElement("div");
        errorMessage.classList.add("error-message");
        errorMessage.style.color = "red";
        input.parentNode.insertBefore(errorMessage, input.nextSibling);
        return errorMessage;
    };

    const firstNameError = createErrorMessage(firstNameInput);
    const lastNameError = createErrorMessage(lastNameInput);
    const emailError = createErrorMessage(emailInput);
    const passwordError = createErrorMessage(passwordInput);
    const confirmPasswordError = createErrorMessage(confirmPasswordInput);

    // Validation for input fields
    const validateFields = () => {
        let isValid = true; // Initialize isValid as true

        if (firstNameInput.value.length < 3) {
            firstNameError.textContent = "First name must be at least 3 characters long.";
            isValid = false; // Set isValid to false if there's an error
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

        return isValid; // Return the validation result
    };

    // Validate on blur for each input
    firstNameInput.addEventListener("blur", validateFields);
    lastNameInput.addEventListener("blur", validateFields);
    emailInput.addEventListener("blur", validateFields);
    passwordInput.addEventListener("blur", validateFields);
    confirmPasswordInput.addEventListener("blur", validateFields);

    // Form submission event
    registerForm.addEventListener("submit", (event) => {
        if (!validateFields()) {
            event.preventDefault(); // Prevent submission if validation fails
            alert("Please correct the errors before submitting."); // Optional: alert user
        } else {
            // Here you can redirect to the personal page or process the form
            alert("Registration successful! Redirecting to your personal page..."); // You can change this as needed
            // window.location.href = "personal_page.html"; // Uncomment to redirect
        }
    });

    // Password visibility toggle
    const togglePasswordVisibility = (passwordField, toggleButton) => {
        toggleButton.addEventListener("click", () => {
            const isPasswordVisible = passwordField.getAttribute("type") === "text";
            passwordField.setAttribute("type", isPasswordVisible ? "password" : "text");
            toggleButton.textContent = isPasswordVisible ? "👁️" : "👁️‍🗨️";
        });
    };

    const passwordToggleBtn = document.createElement("span");
    passwordToggleBtn.textContent = "👁️";
    passwordToggleBtn.style.cursor = "pointer";
    passwordInput.parentNode.appendChild(passwordToggleBtn);
    togglePasswordVisibility(passwordInput, passwordToggleBtn);

    const confirmPasswordToggleBtn = document.createElement("span");
    confirmPasswordToggleBtn.textContent = "👁️";
    confirmPasswordToggleBtn.style.cursor = "pointer";
    confirmPasswordInput.parentNode.appendChild(confirmPasswordToggleBtn);
    togglePasswordVisibility(confirmPasswordInput, confirmPasswordToggleBtn);
});
