let freeChats = 5;

// Handle Terms popup
document.getElementById("continueBtn").addEventListener("click", () => {
  if (document.getElementById("agreeTerms").checked) {
    document.getElementById("termsPopup").classList.add("hidden");
    document.getElementById("userInput").disabled = false;
    document.getElementById("sendBtn").disabled = false;
  } else {
    alert("You must agree to the Terms & Services to continue.");
  }
});

// Chat functionality
document.getElementById("sendBtn").addEventListener("click", async () => {
  const input = document.getElementById("userInput");
  const chat = document.getElementById("chat");
  const msgCount = document.getElementById("msgCount");

  if (!input.value.trim()) return;

  // Show user message
  const userMsg = document.createElement("div");
  userMsg.textContent = "You: " + input.value;
  chat.appendChild(userMsg);

  freeChats--;
  msgCount.textContent = freeChats;

  if (freeChats <= 0) {
    document.getElementById("userInput").disabled = true;
    document.getElementById("sendBtn").disabled = true;
    document.getElementById("planPopup").classList.remove("hidden");
    return;
  }

  // Simulated bot response
  const botMsg = document.createElement("div");
  botMsg.textContent = "Unspoken Healer: Processing your message...";
  chat.appendChild(botMsg);

  setTimeout(() => {
    botMsg.textContent = "Unspoken Healer: Here's a helpful response!";
  }, 1500);

  input.value = "";
  chat.scrollTop = chat.scrollHeight;
});

// Plan popup login button
document.getElementById("loginNowBtn").addEventListener("click", () => {
  document.getElementById("planPopup").classList.add("hidden");
  alert("Login/Register feature will open here.");
});

// Login/Register buttons (placeholder for Firebase auth)
document.getElementById("loginBtn").addEventListener("click", () => {
  alert("Login feature coming soon (Firebase auth)");
});
document.getElementById("registerBtn").addEventListener("click", () => {
  alert("Register feature coming soon (Firebase auth)");
});
document.getElementById("logoutBtn").addEventListener("click", () => {
  alert("Logged out successfully!");
});
