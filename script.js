// ================================
// Simple AI Chat for Unspoken Healer
// ================================

// Create chat UI
const chatBox = document.createElement("div");
chatBox.style.position = "fixed";
chatBox.style.bottom = "10px";
chatBox.style.right = "10px";
chatBox.style.width = "320px";
chatBox.style.height = "420px";
chatBox.style.background = "#fff";
chatBox.style.border = "2px solid #6c63ff";
chatBox.style.borderRadius = "12px";
chatBox.style.display = "flex";
chatBox.style.flexDirection = "column";
chatBox.style.overflow = "hidden";
chatBox.style.zIndex = "1000";
chatBox.style.fontFamily = "Arial, sans-serif";

let chatContent = document.createElement("div");
chatContent.style.flex = "1";
chatContent.style.padding = "10px";
chatContent.style.overflowY = "auto";

let inputBox = document.createElement("input");
inputBox.type = "text";
inputBox.placeholder = "Type your message & press Enter...";
inputBox.style.border = "none";
inputBox.style.padding = "12px";
inputBox.style.width = "100%";
inputBox.style.boxSizing = "border-box";

chatBox.appendChild(chatContent);
chatBox.appendChild(inputBox);
document.body.appendChild(chatBox);

// Replace with your NEW API key
const OPENAI_API_KEY = "const OPENAI_API_KEY = "YOUR_KEY_WILL_BE_LOADED_SECURELY";";

// Function to send user message to OpenAI
async function sendMessage(message) {
    let userMsg = document.createElement("p");
    userMsg.textContent = "🧑 You: " + message;
    chatContent.appendChild(userMsg);

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: message }]
            })
        });

        const data = await response.json();
        let aiMsg = document.createElement("p");
        aiMsg.textContent = "🤖 AI: " + (data.choices?.[0]?.message?.content || "Sorry, I couldn’t reply.");
        chatContent.appendChild(aiMsg);
        chatContent.scrollTop = chatContent.scrollHeight;
    } catch (error) {
        let errorMsg = document.createElement("p");
        errorMsg.textContent = "⚠️ Error: Unable to connect to AI.";
        chatContent.appendChild(errorMsg);
    }
}

// Send when Enter is pressed
inputBox.addEventListener("keypress", function(e) {
    if (e.key === "Enter" && inputBox.value.trim() !== "") {
        sendMessage(inputBox.value);
        inputBox.value = "";
    }
});
