// Handle Terms Popup
document.getElementById("continueBtn").addEventListener("click", () => {
  if (document.getElementById("agreeTerms").checked) {
    document.getElementById("termsPopup").classList.add("hidden");
    document.getElementById("paymentSection").classList.remove("hidden");
  } else {
    alert("You must agree to the terms first!");
  }
});

// Unlock Chat after Payment
document.getElementById("unlockChat").addEventListener("click", () => {
  document.getElementById("paymentSection").classList.add("hidden");
  document.getElementById("chatContainer").style.display = "block";
});

// Chat Logic
document.getElementById("sendBtn").addEventListener("click", async () => {
  const input = document.getElementById("userInput");
  const chat = document.getElementById("chat");

  if (!input.value.trim()) return;

  const userMsg = document.createElement("div");
  userMsg.textContent = "🧑 You: " + input.value;
  chat.appendChild(userMsg);

  const aiMsg = document.createElement("div");
  aiMsg.textContent = "🤖 AI is typing...";
  chat.appendChild(aiMsg);
  chat.scrollTop = chat.scrollHeight;

  try {
    const response = await fetch("/.netlify/functions/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input.value })
    });

    const data = await response.json();
    aiMsg.textContent = "🤖 AI: " + (data.reply || data.error || "Sorry, I couldn’t reply.");
  } catch (err) {
    aiMsg.textContent = "⚠️ Error: " + err.message;
  }

  input.value = "";
  chat.scrollTop = chat.scrollHeight;
});
