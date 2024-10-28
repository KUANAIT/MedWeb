document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email-login").value;
    const password = document.getElementById("password-login").value;

    const user = JSON.parse(localStorage.getItem(email));

    if (user && user.password === password) {
        localStorage.setItem("loggedInUser", email);

        if (user.isAdmin) {
            window.location.href = "admin_panel.html";
        } else {
            window.location.href = "personal_account.html";
        }
    } else {
        alert("Invalid login credentials");
    }
});
