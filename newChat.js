function createChatbot() {
    const chatbotContainer = document.createElement("div");
    chatbotContainer.className = "chatbot-container collapsed";
    chatbotContainer.id = "chatbot-container";
    chatbotContainer.onclick = toggleChat;

    const closeButton = document.createElement("button");
    closeButton.className = "close-button";
    closeButton.onclick = closeChat;
    closeButton.innerHTML = "×";

    const messagesContainer = document.createElement("div");
    messagesContainer.className = "chatbot-messages";
    messagesContainer.id = "chatbot-messages";

    const chatInput = document.createElement("div");
    chatInput.className = "chat-input";

    const userInputField = document.createElement("input");
    userInputField.type = "text";
    userInputField.id = "user-input";
    userInputField.placeholder = "Ask about a medicine...";

    const sendButton = document.createElement("button");
    sendButton.className = "send-button";
    sendButton.onclick = sendMessage;
    sendButton.innerHTML = "Send";

    chatInput.appendChild(userInputField);
    chatInput.appendChild(sendButton);
    chatbotContainer.appendChild(closeButton);
    chatbotContainer.appendChild(messagesContainer);
    chatbotContainer.appendChild(chatInput);

    document.body.appendChild(chatbotContainer);
}

createChatbot();



const messagesContainer = document.getElementById("chatbot-messages");
const chatbotContainer = document.getElementById("chatbot-container");
const chatInput = document.querySelector(".chat-input");
const userInputField = document.getElementById("user-input");

const faqResponses = {
    "what is ibuprofen": "Ibuprofen is a nonsteroidal anti-inflammatory drug (NSAID) commonly used to relieve pain, inflammation, and fever.",
    "ibuprofen": "Ibuprofen is a nonsteroidal anti-inflammatory drug (NSAID) commonly used to relieve pain, inflammation, and fever.",
    "side effects of paracetamol": "Common side effects include nausea and stomach pain. Serious side effects are rare but can include liver damage at high doses.",
    "paracetamol": "Common side effects include nausea and stomach pain. Serious side effects are rare but can include liver damage at high doses.",
    "how to use amoxicillin": "Take amoxicillin exactly as prescribed by your doctor. Usually taken every 8-12 hours with or without food.",
    "can i take aspirin daily": "Daily aspirin should only be taken if recommended by your healthcare provider, as it can increase the risk of bleeding.",
    "hello": "Hello! I'm here to help with your medicine-related questions. Ask me about any medicine!",
    "thank you": "You're welcome! Let me know if you have more questions.",
    "what are the symptoms of diabetes": "Common symptoms of diabetes include increased thirst, frequent urination, extreme fatigue, and blurred vision.",
    "what is hypertension": "Hypertension, or high blood pressure, is a condition where the force of the blood against the artery walls is too high. It can lead to serious health issues if untreated.",
    "how to manage asthma": "Managing asthma typically involves avoiding triggers, using inhalers as prescribed, and following an asthma action plan developed with your healthcare provider.",
    "what is the flu": "The flu is a contagious respiratory illness caused by influenza viruses. Symptoms include fever, cough, sore throat, body aches, and fatigue.",
    "how to treat allergies": "Allergies can be managed with antihistamines, nasal sprays, and avoiding known allergens. Consult a healthcare provider for personalized advice.",
    "what is depression": "Depression is a mood disorder that causes persistent feelings of sadness and loss of interest. Treatment may include therapy, medication, or lifestyle changes.",
    "how to prevent headaches": "To prevent headaches, maintain hydration, manage stress, get regular sleep, and avoid triggers like certain foods and excessive screen time.",
    "what is cholesterol": "Cholesterol is a waxy substance found in your blood. High levels can increase the risk of heart disease. It's important to monitor cholesterol levels through diet and regular check-ups.",
    "what are the side effects of antibiotics": "Common side effects of antibiotics include nausea, diarrhea, and allergic reactions. It's essential to take them as prescribed and consult your doctor if you experience severe side effects.",
    "how to treat a cold": "Treating a cold usually involves rest, hydration, and over-the-counter medications to relieve symptoms. Antibiotics are not effective against viral infections like the cold.",
    "what is arthritis": "Arthritis is an inflammation of the joints that causes pain and stiffness. It can be managed with medication, physical therapy, and lifestyle changes.",
    "how to boost the immune system": "To boost your immune system, maintain a balanced diet rich in fruits and vegetables, exercise regularly, get enough sleep, and manage stress."
};

function preventClose(event) {
    event.stopPropagation();
}

function sendMessage(event) {
    event.stopPropagation();
    const userMessage = userInputField.value.toLowerCase();
    if (userMessage.trim() === "") return;

    appendMessage(userMessage, "user");

    const botResponse = getBotResponse(userMessage);
    setTimeout(() => appendMessage(botResponse, "bot"), 500);

    userInputField.value = "";
}

function getBotResponse(message) {
    return faqResponses[message] || "I'm sorry, I don't have information on that. Please consult a healthcare professional for advice.";
}

function appendMessage(message, sender) {
    const messageElement = document.createElement("div");
    messageElement.className = `message ${sender}`;
    messageElement.textContent = message;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function toggleChat() {
    chatbotContainer.classList.toggle("collapsed");
    const isCollapsed = chatbotContainer.classList.contains("collapsed");

    messagesContainer.style.display = isCollapsed ? "none" : "block";
    chatInput.style.display = isCollapsed ? "none" : "flex";
}

function closeChat(event) {
    event.stopPropagation();
    chatbotContainer.classList.add("collapsed");
    messagesContainer.style.display = "none";
    chatInput.style.display = "none";
}

chatInput.addEventListener("click", preventClose);
messagesContainer.addEventListener("click", preventClose);
