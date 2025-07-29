// Firebase Config
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDpSDZydyYmVv_cB_xErTL_KiKx0l11dEM",
  authDomain: "unspokenhealer-f626a.firebaseapp.com",
  projectId: "unspokenhealer-f626a",
  storageBucket: "unspokenhealer-f626a.firebasestorage.app",
  messagingSenderId: "1009119300737",
  appId: "1:1009119300737:web:1ae60b6caf0c7389fc5180",
  measurementId: "G-T44HTFGYSE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let agreedToTerms = false;
let freeMessages = 5;

// Popup handling
document.getElementById("continueBtn").addEventListener("click", () => {
  if (document.getElementById("agreeTerms").checked) {
    document.getElementById("termsPopup").classList.add("hidden");
    agreedToTerms = true;
    document.getElementById("status").textContent = "You can now login and start chatting.";
  } else {
    alert("Please agree to the Terms & Services first.");
  }
});

// Auth buttons
document.getElementById("loginBtn").addEventListener("click", () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      document.getElementById("status").textContent = `Welcome ${result.user.displayName}`;
      document.getElementById("logoutBtn").classList.remove("hidden");
      document.getElementById("loginBtn").classList.add("hidden");
      document.getElementById("registerBtn").classList.add("hidden");
      enableChat();
    })
    .catch((error) => alert(error.message));
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  signOut(auth).then(() => {
    document.getElementById("status").textContent = "Logged out.";
    document.getElementById("logoutBtn").classList.add("hidden");
    document.getElementById("loginBtn").classList.remove("hidden");
    document.getElementById("registerBtn").classList.remove("hidden");
    disableChat();
  });
});

// Chat sending
document.getElementById("sendBtn").addEventListener("click", async () => {
  const input = document.getElementById("userInput");
  const chat = document.getElementById("chat");

  if (!input.value.trim()) return;
  if (!agreedToTerms) {
    alert("You must agree to Terms first.");
    return;
  }

  if (freeMessages <= 0) {
    chat.innerHTML += `<p><b>System:</b> You’ve used your 5 free messages. Please purchase a plan to continue.</p>`;
    input.value = "";
    return;
  }

  chat.innerHTML += `<p><b>You:</b> ${input.value}</p>`;
  const userMessage = input.value;
  input.value = "";

  // Call Netlify function
  try {
    const res = await fetch("/.netlify/functions/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage })
    });
    const data = await res.json();
    chat.innerHTML += `<p><b>Healer:</b> ${data.reply}</p>`;
  } catch (err) {
    chat.innerHTML += `<p><b>Healer:</b> Sorry, I couldn’t reply.</p>`;
  }

  freeMessages--;
  document.getElementById("status").textContent = `Messages left: ${freeMessages}`;
});

function enableChat() {
  document.getElementById("userInput").disabled = false;
  document.getElementById("sendBtn").disabled = false;
}
function disableChat() {
  document.getElementById("userInput").disabled = true;
  document.getElementById("sendBtn").disabled = true;
}
