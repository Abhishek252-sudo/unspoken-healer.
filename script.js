document.addEventListener("DOMContentLoaded", () => {
  const termsPopup = document.getElementById("terms-popup");
  const agreeCheckbox = document.getElementById("agree-checkbox");
  const agreeBtn = document.getElementById("agree-btn");
  const chatBox = document.getElementById("chat-box");
  const chatContent = document.getElementById("chat-content");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");

  let freeMessages = 5;

  // Show popup on load
  termsPopup.style.display = "block";

  // Handle agreement
  agreeBtn.addEventListener("click", () => {
    if (agreeCheckbox.checked) {
      termsPopup.style.display = "none";
      chatBox.style.display = "block";
    } else {
      alert("⚠️ Please agree to the Terms before continuing.");
    }
  });

  // Send message
  async function sendMessage(message) {
    if (!message.trim()) return;

    let userMsg = document.createElement("p");
    userMsg.textContent = "🧑 You: " + message;
    chatContent.appendChild(userMsg);

    try {
      const response = await fetch("/.netlify/functions/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });

      const data = await response.json();
      let aiMsg = document.createElement("p");
      aiMsg.textContent =
        "🤖 AI: " +
        (data.choices?.[0]?.message?.content || "Sorry, I couldn’t reply.");
      chatContent.appendChild(aiMsg);
      chatContent.scrollTop = chatContent.scrollHeight;

      freeMessages--;
      if (freeMessages === 0) setTimeout(showPaymentPopup, 500);

    } catch (error) {
      let errorMsg = document.createElement("p");
      errorMsg.textContent = "⚠️ Error: Unable to connect to AI.";
      chatContent.appendChild(errorMsg);
    }

    userInput.value = "";
  }

  sendBtn.addEventListener("click", () => sendMessage(userInput.value));
  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage(userInput.value);
  });

  function showPaymentPopup() {
    alert("⚠️ Free trial ended.\n\n👉 7 Days: ₹110\n👉 Monthly: ₹460\n\nPayPal: https://paypal.me/AbhishekBhandari734\nPaytm: paytmąrlj18py8rlj@paytm\n\nSend receipt to infoabhishekbhandari@gmail.com");
  }
});
