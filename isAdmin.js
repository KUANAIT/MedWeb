function logout() {
    localStorage.removeItem("currentUserEmail");
    localStorage.removeItem("isAdmin"); // Удаляем флаг администратора при выходе
    window.location.href = "login.html";
}
