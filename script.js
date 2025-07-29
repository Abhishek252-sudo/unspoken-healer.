document.addEventListener("DOMContentLoaded", () => {
  const termsPopup = document.getElementById("termsPopup");
  const agreeTerms = document.getElementById("agreeTerms");
  const continueBtn = document.getElementById("continueBtn");
  const sendBtn = document.getElementById("sendBtn");
  const userInput = document.getElementById("userInput");
  const chatBox = document.getElementById("chat");

  continueBtn.addEventListener("click", () => {
    if (agreeTerms.checked) {
      termsPopup.classList.add("hidden");
    } else {
      alert("Please agree to the Terms & Services first.");
    }
  });

  sendBtn.addEventListener("click", async () => {
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage("You", message);
    userInput.value = "";

    try {
      const response = await fetch("/.netlify/functions/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });

      if (!response.ok) {
        appendMessage("AI", "⚠️ Sorry, problem connecting to AI.");
        return;
      }

      const data = await response.json();
      appendMessage("AI", data.reply || "⚠️ No reply received.");
    } catch (error) {
      console.error("Error:", error);
      appendMessage("AI", "⚠️ Unable to connect to AI.");
    }
  });

  function appendMessage(sender, text) {
    const msg = document.createElement("p");
    msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
});
