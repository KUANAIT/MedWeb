
function openAdminPanel() {

    const panel = document.createElement("div");
    panel.id = "adminPanel";
    panel.style.position = "fixed";
    panel.style.top = "50%";
    panel.style.left = "50%";
    panel.style.transform = "translate(-50%, -50%)";
    panel.style.width = "300px";
    panel.style.maxWidth = "80%";
    panel.style.backgroundColor = "#f8f9fa";
    panel.style.border = "1px solid #ccc";
    panel.style.borderRadius = "8px";
    panel.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
    panel.style.zIndex = "1000";


    const header = document.createElement("div");
    header.style.display = "flex";
    header.style.justifyContent = "space-between";
    header.style.alignItems = "center";
    header.style.padding = "10px";
    header.style.backgroundColor = "#007bff";
    header.style.color = "#fff";
    header.style.borderTopLeftRadius = "8px";
    header.style.borderTopRightRadius = "8px";

    const title = document.createElement("span");
    title.innerText = "Админ-панель";
    header.appendChild(title);

    const closeButton = document.createElement("button");
    closeButton.innerText = "✖";
    closeButton.style.background = "none";
    closeButton.style.border = "none";
    closeButton.style.color = "#fff";
    closeButton.style.fontSize = "1.2em";
    closeButton.style.cursor = "pointer";
    closeButton.onclick = () => document.body.removeChild(panel);
    header.appendChild(closeButton);

    panel.appendChild(header);


    const content = document.createElement("div");
    content.style.padding = "20px";
    content.innerText = "Добро пожаловать в админ-панель!";
    panel.appendChild(content);


    document.body.appendChild(panel);
}

const openButton = document.createElement("button");
openButton.innerText = "Открыть админ-панель";
openButton.style.cursor = "pointer";
openButton.onclick = openAdminPanel;
document.body.appendChild(openButton);
