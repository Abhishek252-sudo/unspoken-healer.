// script.js
document.getElementById("sendBtn").addEventListener("click", async () => {
  const input = document.getElementById("userInput");
  const chat = document.getElementById("chat");
  const userMsg = document.createElement("div");
  userMsg.textContent = "🧑 You: " + input.value;
  chat.appendChild(userMsg);

  const response = await fetch("/.netlify/functions/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: input.value })
  });

  const data = await response.json();

  const aiMsg = document.createElement("div");
  aiMsg.textContent = "🤖 AI: " + (data.reply || "Sorry, I couldn’t reply.");
  chat.appendChild(aiMsg);

  input.value = "";
  chat.scrollTop = chat.scrollHeight;
});
