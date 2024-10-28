// Массив с данными администраторов
const admins = [
    { email: "admin1@example.com", password: "adminpass1" },
    { email: "admin2@example.com", password: "adminpass2" }
];

function isAdmin(email, password) {
    return admins.some(admin => admin.email === email && admin.password === password);
}

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email-login").value;
    const password = document.getElementById("password-login").value;

    const users = getUsers();

    // Проверка на наличие пользователя или администратора
    const user = users.find(user => user.email === email && user.password === password);
    const admin = isAdmin(email, password);

    if (user || admin) {
        // Сохраняем email текущего пользователя
        localStorage.setItem("currentUserEmail", email);

        // Проверяем, является ли пользователь администратором
        if (admin) {
            localStorage.setItem("isAdmin", "true"); // Флаг администратора
            alert("Вход выполнен как администратор!");
            window.location.href = "admin_dashboard.html"; // Перенаправление на панель администратора
        } else {
            localStorage.removeItem("isAdmin"); // Удаляем флаг администратора, если это обычный пользователь
            alert("Успешный вход!");
            window.location.href = "personal_account.html"; // Перенаправление в личный кабинет
        }
    } else {
        alert("Неверный email или пароль");
    }
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
