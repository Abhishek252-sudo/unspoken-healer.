let userId = localStorage.getItem("userId");
if (!userId) {
  userId = "guest_" + Math.floor(Math.random() * 1000000);
  localStorage.setItem("userId", userId);
}
let freeCount = 0;

function sendMessage() {
  const inputField = document.getElementById('userInput');
  const input = inputField.value;
  if (!input.trim()) return;

  const log = document.getElementById('chatLog');
  const userMsg = document.createElement('div');
  userMsg.className = "chat-msg";
  userMsg.innerHTML = "<strong>You:</strong> " + input;
  log.appendChild(userMsg);

  const aiMsg = document.createElement('div');
  aiMsg.className = "chat-msg";
  log.appendChild(aiMsg);

  freeCount++;
  if (freeCount <= 5) {
    aiMsg.innerHTML = "<strong>AI:</strong> This is a demo reply. In the full version, I will provide real-time answers.";
  } else {
    aiMsg.innerHTML = `
      <p>⚠️ You’ve reached your free limit.</p>
      <p><strong>Choose your subscription:</strong></p>
      <ul>
        <li>🎯 Beginner Pack: ₹110 for 7 days</li>
        <li>🌙 Monthly Pack: ₹430</li>
      </ul>
      <button onclick="payWithPayPal()">💳 Pay with PayPal</button>
      <button onclick="payWithPaytm()">📲 Pay with Paytm / UPI</button>
    `;
  }

  inputField.value = "";
  log.scrollTop = log.scrollHeight;
}

function payWithPayPal() {
  window.open("https://paypal.me/AbhishekBhandari734/2", "_blank");
}

function payWithPaytm() {
  alert("📲 Pay via UPI:\nUPI ID: paytmąrlj18py8rlj@paytm\n\nPlans:\n• ₹110 for 7 days\n• ₹430 for 1 month\n\nAfter payment, email proof to infoabhishekbhandari@gmail.com");
}

function openPaymentOptions() {
  alert("Choose a plan:\n\n🎯 Beginner Pack: ₹110 / 7 days\n🌙 Monthly Pack: ₹430 / month\n\nPayment Options:\n\nPayPal: https://paypal.me/AbhishekBhandari734/2\n\nUPI (Paytm): paytmąrlj18py8rlj@paytm\n\nAfter payment, please email proof to infoabhishekbhandari@gmail.com");
}

function startChat() {
  if (document.getElementById('agree').checked) {
    document.getElementById('termsPopup').style.display = 'none';
  } else {
    alert("Please agree to the Terms & Services first.");
  }
}
