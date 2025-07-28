let freeMessages = 5; // free trial messages before payment
const chatContent = document.getElementById("chat-content");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

async function sendMessage(message) {
    if (!message.trim()) return;

    // Show user message
    let userMsg = document.createElement("p");
    userMsg.textContent = "🧑 You: " + message;
    chatContent.appendChild(userMsg);

    // Call Netlify Function instead of OpenAI directly
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

        // Reduce free message count
        freeMessages--;
        if (freeMessages === 0) {
            setTimeout(showPaymentPopup, 500);
        }

    } catch (error) {
        let errorMsg = document.createElement("p");
        errorMsg.textContent = "⚠️ Error: Unable to connect to AI.";
        chatContent.appendChild(errorMsg);
    }

    // Clear input box
    userInput.value = "";
}

// Send button click
sendBtn.addEventListener("click", () => {
    sendMessage(userInput.value);
});

// Send with Enter key
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendMessage(userInput.value);
    }
});

// Payment popup after free messages
function showPaymentPopup() {
    alert("⚠️ You have used all free messages.\n\n" +
          "To continue chatting:\n\n" +
          "👉 Pay ₹110 for 7 days\n" +
          "👉 Monthly: ₹460 (₹10 off)\n\n" +
          "Payment options:\n" +
          "PayPal: https://paypal.me/AbhishekBhandari734\n" +
          "Paytm UPI: paytmąrlj18py8rlj@paytm\n\n" +
          "After payment, email your receipt to: infoabhishekbhandari@gmail.com");
}
