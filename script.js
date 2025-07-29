// script.js

// --------------------
// Firebase Config (placeholder — replace with your Firebase project keys later)
// --------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
  projectId: "YOUR_FIREBASE_PROJECT_ID",
  appId: "YOUR_FIREBASE_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// --------------------
// DOM Elements
// --------------------
const chatBox = document.getElementById("chat");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const freeCountEl = document.getElementById("freeCount");
const statusEl = document.getElementById("status");

const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const logoutBtn = document.getElementById("logoutBtn");

const termsPopup = document.getElementById("termsPopup");
const agreeTerms = document.getElementById("agreeTerms");
const continueBtn = document.getElementById("continueBtn");

const subscribePopup = document.getElementById("subscribePopup");

// --------------------
// State
// --------------------
let freeMessages = 5;
let agreed = false;

// --------------------
// Terms Agreement
// --------------------
continueBtn.addEventListener("click", () => {
  if (agreeTerms.checked) {
    termsPopup.classList.add("hidden");
    agreed = true;
  } else {
    alert("Please agree to the terms before continuing.");
  }
});

// --------------------
// Chat Functionality
// --------------------
function appendMessage(sender, message) {
  const msg = document.createElement("p");
  msg.textContent = `${sender}: ${message}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener("click", () => {
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

  setTimeout(() => {
    appendMessage("Unspoken Healer", "Here's a helpful response!");
  }, 500);

  freeMessages--;
  freeCountEl.textContent = freeMessages;
});

// Allow Enter key to send
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendBtn.click();
  }
});

// --------------------
// Auth Placeholder
// --------------------
loginBtn.addEventListener("click", () => {
  alert("Login feature coming soon (Firebase auth)");
});

registerBtn.addEventListener("click", () => {
  alert("Register feature coming soon (Firebase auth)");
});

logoutBtn.addEventListener("click", async () => {
  try {
    await signOut(auth);
    alert("Logged out successfully.");
    logoutBtn.classList.add("hidden");
    loginBtn.classList.remove("hidden");
    registerBtn.classList.remove("hidden");
  } catch (error) {
    console.error(error);
    alert("Logout failed.");
  }
});
