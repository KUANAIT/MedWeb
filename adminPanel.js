
let users = [
    { id: 1, firstName: "Kuanysh", lastName: "Aitzhanov", dateOfBirth: "2005-12-22", status: "admin", email: "kuanysh.a@densaulyq.kz", password: "12345" },
    { id: 2, firstName: "Liana", lastName: "Smatulla", dateOfBirth: "2005-07-12", status: "admin", email: "liana.s@densaulyq.kz", password: "54321" },
    { id: 3, firstName: "Gaziza", lastName: "Tanirbergen", dateOfBirth: "2004-05-22", status: "admin", email: "gaziza.t@densaulyq.kz", password: "22054" },

];

function checkStatusAndOpenPanel() {
    const currentUser = users.find(user => users.status === "admin");
    if (currentUser && currentUser.status === "admin") {
        openAdminPanel();
    } else {
        alert("У вас нет доступа к админ-панели");
    }
}

function openAdminPanel() {
    const panel = document.createElement("div");
    panel.id = "adminPanel";
    panel.style = `
        position: fixed; top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        width: 400px; background-color: #f8f9fa;
        border: 1px solid #ccc; border-radius: 8px;
        padding: 20px; z-index: 1000;
    `;
    const title = document.createElement("h3");
    title.innerText = "Админ-панель управления пользователями";
    panel.appendChild(title);

    const userList = document.createElement("ul");
    userList.id = "userList";
    renderUserList(userList);
    panel.appendChild(userList);

    const addUserForm = document.createElement("form");
    addUserForm.innerHTML = `
        <h4>Add new user</h4>
        <input type="text" id="firstNameInput" placeholder="Имя" required><br>
        <input type="text" id="lastNameInput" placeholder="Фамилия" required><br>
        <input type="date" id="dobInput" required><br>
        <input type="text" id="statusInput" placeholder="Статус" required><br>
        <input type="email" id="emailInput" placeholder="Email" required><br>
        <input type="password" id="passwordInput" placeholder="Пароль" required><br>
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
        userItem.innerText = `${user.firstName} ${user.lastName}, ${user.dateOfBirth}, ${user.status} - ${user.email} `;

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
    const firstName = document.getElementById("firstNameInput").value;
    const lastName = document.getElementById("lastNameInput").value;
    const dateOfBirth = document.getElementById("dobInput").value;
    const status = document.getElementById("statusInput").value;
    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;

    if (firstName && lastName && dateOfBirth && email && password) {
        users.push({
            id: Date.now(),
            firstName,
            lastName,
            dateOfBirth,
            status,
            email,
            password
        });

        document.getElementById("firstNameInput").value = "";
        document.getElementById("lastNameInput").value = "";
        document.getElementById("dobInput").value = "";
        document.getElementById("statusInput").value = "";
        document.getElementById("emailInput").value = "";
        document.getElementById("passwordInput").value = "";
    }
}


function editUser(id) {
    const user = users.find((u) => u.id === id);
    if (user) {
        user.firstName = prompt("Your new name", user.firstName) || user.firstName;
        user.lastName = prompt("Your new surname", user.lastName) || user.lastName;
        user.dateOfBirth = prompt("Your date of birth", user.dateOfBirth) || user.dateOfBirth;
        user.status = prompt("Your status", user.status) || user.status;
        user.email = prompt("Your new email", user.email) || user.email;
        user.password = prompt("Your new password", user.password) || user.password;

        renderUserList(document.getElementById("userList"));
    }
}


function deleteUser(id) {
    users = users.filter((user) => user.id !== id);
}

const openButton = document.createElement("button");
openButton.innerText = "Открыть админ-панель";
openButton.onclick = checkStatusAndOpenPanel;
document.body.appendChild(openButton);
