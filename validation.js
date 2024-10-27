let users = [
    { id: 1, firstName: "Kuanysh", lastName: "Aitzhanov", dateOfBirth: "2005-12-22", status: "admin", email: "kuanysh.a@densaulyq.kz", password: "12345" },
    { id: 2, firstName: "Liana", lastName: "Smatulla", dateOfBirth: "2005-07-12", status: "admin", email: "liana.s@densaulyq.kz", password: "54321" },
    { id: 3, firstName: "Gaziza", lastName: "Tanirbergen", dateOfBirth: "2004-05-22", status: "admin", email: "gaziza.t@densaulyq.kz", password: "22054" },

];

function getUsers() {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
}


function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}


document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email-register").value;
    const dob = document.getElementById("dob").value;
    const password = document.getElementById("password-signup").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
        alert("Пароли не совпадают");
        return;
    }

    const users = getUsers();


    if (users.some(user => user.email === email)) {
        alert("Пользователь с таким email уже существует");
        return;
    }

    const newUser = { firstName, lastName, email, dob, password };
    users.push(newUser);
    saveUsers(users);

    alert("Регистрация успешна! Теперь войдите в свой аккаунт.");
    window.location.href = "personal_account.html";
});


document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email-login").value;
    const password = document.getElementById("password-login").value;

    const users = getUsers();

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        alert("Успешный вход!");
        window.location.href = "personal_account.html";
    } else {
        alert("Неверный email или пароль");
    }
});
