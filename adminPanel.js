let users = [
    { id: 1, name: "Kuanysh", email: "ivan@example.com"}
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


function renderUserList(userList) {
    userList.innerHTML = ""; // Очищаем список
    users.forEach((user) => {
        const userItem = document.createElement("li");
        userItem.innerText = `${user.name} - ${user.email} `;

        const editButton = document.createElement("button");
        editButton.innerText = "Редактировать";
        editButton.onclick = () => editUser(user.id);
        userItem.appendChild(editButton);

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
    const name = document.getElementById("nameInput").value;
    const email = document.getElementById("emailInput").value;

    if (name && email) {
        users.push({ id: Date.now(), name, email });
        document.getElementById("nameInput").value = "";
        document.getElementById("emailInput").value = "";
    }
}

function editUser(id) {
    const user = users.find((u) => u.id === id);
    if (user) {
        const newName = prompt("New name", user.name);
        const newEmail = prompt("New email", user.email);
        if (name) user.name = newEmail;
        renderUserList(document.getElementById("userList"));
    }
}

function deleteUser(id) {
    users = users.filter((user) => user.id !== id);
}
