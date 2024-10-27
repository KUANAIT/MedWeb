// Массив для хранения данных пользователей
let users = [
    { id: 1, name: "Иван Иванов", email: "ivan@example.com" },
    { id: 2, name: "Анна Смирнова", email: "anna@example.com" }
];

// Функция для открытия админ-панели
function openAdminPanel() {
    // Создаём контейнер панели
    const panel = document.createElement("div");
    panel.id = "adminPanel";
    panel.style.position = "fixed";
    panel.style.top = "50%";
    panel.style.left = "50%";
    panel.style.transform = "translate(-50%, -50%)";
    panel.style.width = "400px";
    panel.style.backgroundColor = "#f8f9fa";
    panel.style.border = "1px solid #ccc";
    panel.style.borderRadius = "8px";
    panel.style.padding = "20px";
    panel.style.zIndex = "1000";

    // Заголовок панели
    const title = document.createElement("h3");
    title.innerText = "Админ-панель управления пользователями";
    panel.appendChild(title);

    // Список пользователей
    const userList = document.createElement("ul");
    userList.id = "userList";
    renderUserList(userList);
    panel.appendChild(userList);

    // Форма для добавления нового пользователя
    const addUserForm = document.createElement("form");
    addUserForm.innerHTML = `
        <h4>Добавить пользователя</h4>
        <input type="text" id="nameInput" placeholder="Имя" required><br>
        <input type="email" id="emailInput" placeholder="Email" required><br>
        <button type="submit">Добавить</button>
    `;
    addUserForm.onsubmit = (e) => {
        e.preventDefault();
        addUser();
        renderUserList(userList);
    };
    panel.appendChild(addUserForm);

    // Кнопка закрытия панели
    const closeButton = document.createElement("button");
    closeButton.innerText = "Закрыть";
    closeButton.onclick = () => document.body.removeChild(panel);
    panel.appendChild(closeButton);

    document.body.appendChild(panel);
}

// Функция для отображения списка пользователей
function renderUserList(userList) {
    userList.innerHTML = ""; // Очищаем список
    users.forEach((user) => {
        const userItem = document.createElement("li");
        userItem.innerText = `${user.name} - ${user.email} `;

        // Кнопка для редактирования
        const editButton = document.createElement("button");
        editButton.innerText = "Редактировать";
        editButton.onclick = () => editUser(user.id);
        userItem.appendChild(editButton);

        // Кнопка для удаления
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Удалить";
        deleteButton.onclick = () => {
            deleteUser(user.id);
            renderUserList(userList);
        };
        userItem.appendChild(deleteButton);

        userList.appendChild(userItem);
    });
}

// Функция для добавления нового пользователя
function addUser() {
    const name = document.getElementById("nameInput").value;
    const email = document.getElementById("emailInput").value;
    if (name && email) {
        users.push({ id: Date.now(), name, email });
        document.getElementById("nameInput").value = "";
        document.getElementById("emailInput").value = "";
    }
}

// Функция для редактирования пользователя
function editUser(id) {
    const user = users.find((u) => u.id === id);
    if (user) {
        const newName = prompt("Введите новое имя", user.name);
        const newEmail = prompt("Введите новый email", user.email);
        if (newName) user.name = newName;
        if (newEmail) user.email = newEmail;
        renderUserList(document.getElementById("userList"));
    }
}

// Функция для удаления пользователя
function deleteUser(id) {
    users = users.filter((user) => user.id !== id);
}

// Кнопка для открытия админ-панели
const openButton = document.createElement("button");
openButton.innerText = "Открыть админ-панель";
openButton.onclick = openAdminPanel;
document.body.appendChild(openButton);
