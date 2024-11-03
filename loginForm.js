document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email-login");
    const passwordInput = document.getElementById("password-login");

    const createErrorMessage = (input) => {
        const errorMessage = document.createElement("div");
        errorMessage.classList.add("error-message");
        errorMessage.style.color = "red";
        errorMessage.style.fontSize = "small";
        input.parentNode.appendChild(errorMessage);
        return errorMessage;
    };

    const emailErrorMessage = createErrorMessage(emailInput);
    const passwordErrorMessage = createErrorMessage(passwordInput);

    const clearErrorMessages = () => {
        emailErrorMessage.textContent = "";
        passwordErrorMessage.textContent = "";
    };

    // Function to validate email input in real-time
    const validateEmail = () => {
        clearErrorMessages(); // Clear any existing messages

        const email = emailInput.value;
        const user = JSON.parse(localStorage.getItem(email));

        if (!email) {
            emailErrorMessage.textContent = "Email is required.";
        } else if (!user) {
            emailErrorMessage.textContent = "This email is not registered. Please register.";
        }
    };

    // Validate email on input change
    emailInput.addEventListener("input", validateEmail);

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        clearErrorMessages();

        const email = emailInput.value;
        const password = passwordInput.value;
        const user = JSON.parse(localStorage.getItem(email));

        // Check email validity
        if (!email) {
            emailErrorMessage.textContent = "Email is required.";
            return;
        }

        if (!user) {
            emailErrorMessage.textContent = "This email is not registered. Please register.";
            return;
        }

        if (!password) {
            passwordErrorMessage.textContent = "Password is required.";
            return;
        }

        if (user.password === password) {
            localStorage.setItem("loggedInUser", email);
            if (user.isAdmin) {
                window.location.href = "admin_panel.html";
            } else {
                window.location.href = "personal_account.html";
            }
        } else {
            passwordErrorMessage.textContent = "Incorrect password. Please try again.";
        }
    });
});
