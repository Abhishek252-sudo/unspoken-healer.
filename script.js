// script.js
let agreed = false;
let freeMessages = 5;

const chatBox = document.getElementById("chat");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const freeCountEl = document.getElementById("freeCount");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const logoutBtn = document.getElementById("logoutBtn");
const termsPopup = document.getElementById("termsPopup");
const continueBtn = document.getElementById("continueBtn");
const agreeTerms = document.getElementById("agreeTerms");
const subscribePopup = document.getElementById("subscribePopup");
const closeSubscribe = document.getElementById("closeSubscribe");

freeCountEl.textContent = freeMessages;

// Append messages
function appendMessage(sender, message) {
  const msg = document.createElement("p");
  msg.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// AI Response using OpenAI API
async function getAIResponse(message) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_OPENAI_API_KEY" // replace with real key
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "Sorry, I didn’t understand that.";
  } catch (error) {
    return "⚠️ Network error. Please try again.";
  }
}

// Send message
sendBtn.addEventListener("click", async () => {
  if (!agreed) {
    alert("Please agree to the terms first.");
    return;
  }
  if (freeMessages <= 0) {
    subscribePopup.classList.remove("hidden");
    return;
  }

  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage("You", userMessage);
  input.value = "";

  const reply = await getAIResponse(userMessage);
  appendMessage("Unspoken Healer", reply);

  freeMessages--;
  freeCountEl.textContent = freeMessages;
});

// Allow pressing Enter to send
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendBtn.click();
});

// Handle Terms Popup
continueBtn.addEventListener("click", () => {
  if (!agreeTerms.checked) {
    alert("Please agree to the terms first.");
    return;
  }
  agreed = true;
  termsPopup.classList.add("hidden");
  input.disabled = false;
  sendBtn.disabled = false;
});

// Handle Subscribe Popup
if (closeSubscribe) {
  closeSubscribe.addEventListener("click", () => {
    subscribePopup.classList.add("hidden");
  });
}

// Auth buttons (for now just placeholders)
loginBtn.addEventListener("click", () => {
  alert("Login feature coming soon (Firebase auth)");
});
registerBtn.addEventListener("click", () => {
  alert("Register feature coming soon (Firebase auth)");
});
logoutBtn.addEventListener("click", () => {
  alert("Logout feature coming soon");
});
