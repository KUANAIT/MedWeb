
let users = [
    { id: 1, firstName: "Kuanysh", lastName: "Aitzhanov", email: "ivan@example.com", password: "123456" }
];


function openAdminPanel() {
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


    const title = document.createElement("h3");
    title.innerText = "Админ-панель управления пользователями";
    panel.appendChild(title);


    const userList = document.createElement("ul");
    userList.id = "userList";
    renderUserList(userList);
    panel.appendChild(userList);

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

function addUser() {
    const firstName = document.getElementById("firstNameInput").value;
    const lastName = document.getElementById("lastNameInput").value;
    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;

    if (name && email) {
        users.push({ id: Date.now(), name, email });
        document.getElementById("nameInput").value = "";
        document.getElementById("emailInput").value = "";
    }
}

function editUser(id) {
    const user = users.find((u) => u.id === id);
    if (user) {
        const newName = prompt("New name", user.firstName);
        const newSurname = prompt("New name", user.lastName);
        const newEmail = prompt("New email", user.email);
        const newPassword = prompt("New password", user.password);
        if (newName) user.firstName = newName;
        if (newEmail) user.email = newEmail;
        if (newSurname) user.lastName = newSurname;
        if (newPassword) user.email = newPassword;
        renderUserList(document.getElementById("userList"));
    }
}

function deleteUser(id) {
    users = users.filter((user) => user.id !== id);
}

const openButton = document.createElement("button");
openButton.innerText = "Open admin panel";
openButton.onclick = openAdminPanel;
document.body.appendChild(openButton);
