// Firebase Config
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDpSDZydyYmVv_cB_xErTL_KiKx0l11dEM",
  authDomain: "unspokenhealer-f626a.firebaseapp.com",
  projectId: "unspokenhealer-f626a",
  storageBucket: "unspokenhealer-f626a.firebasestorage.app",
  messagingSenderId: "1009119300737",
  appId: "1:1009119300737:web:1ae60b6caf0c7389fc5180"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const logoutBtn = document.getElementById("logoutBtn");
const statusSection = document.getElementById("statusSection");
const welcomeMsg = document.getElementById("welcomeMsg");
const sessionCount = document.getElementById("sessionCount");

const provider = new GoogleAuthProvider();

// Login/Register
loginBtn.addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (err) {
    alert("Login failed: " + err.message);
  }
});
registerBtn.addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (err) {
    alert("Register failed: " + err.message);
  }
});
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
});

// Track auth state
onAuthStateChanged(auth, async (user) => {
  if (user) {
    welcomeMsg.textContent = `Welcome, ${user.displayName || "User"}!`;
    statusSection.classList.remove("hidden");
    loginBtn.classList.add("hidden");
    registerBtn.classList.add("hidden");
    logoutBtn.classList.remove("hidden");

    // Load session count
    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      sessionCount.textContent = snap.data().sessions;
    } else {
      await setDoc(userRef, { sessions: 0 });
      sessionCount.textContent = 0;
    }
  } else {
    statusSection.classList.add("hidden");
    loginBtn.classList.remove("hidden");
    registerBtn.classList.remove("hidden");
    logoutBtn.classList.add("hidden");
  }
});

// Activate Plan
document.querySelectorAll(".activatePlan").forEach(btn => {
  btn.addEventListener("click", async () => {
    const plan = btn.dataset.plan;
    const user = auth.currentUser;
    if (!user) {
      alert("Please login first.");
      return;
    }
    const userRef = doc(db, "users", user.uid);
    let sessions = plan === "day" ? 3 : 21;
    await setDoc(userRef, { sessions });
    sessionCount.textContent = sessions;
    alert(`Your ${plan} plan has been activated!`);
  });
});

// Feature Access
document.querySelectorAll(".feature-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const user = auth.currentUser;
    if (!user) {
      document.getElementById("paymentPopup").classList.remove("hidden");
      return;
    }
    if (parseInt(sessionCount.textContent) <= 0) {
      document.getElementById("paymentPopup").classList.remove("hidden");
      return;
    }
    sessionCount.textContent = parseInt(sessionCount.textContent) - 1;
    alert(`You started ${btn.dataset.feature}. Remaining sessions updated.`);
  });
});

// Popup close
document.getElementById("closePopup").addEventListener("click", () => {
  document.getElementById("paymentPopup").classList.add("hidden");
});

// Reviews
document.getElementById("reviewForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const text = document.getElementById("reviewText").value;
  if (text.trim() === "") return;
  const reviewDiv = document.createElement("div");
  reviewDiv.textContent = text;
  document.getElementById("reviewsList").appendChild(reviewDiv);
  document.getElementById("reviewText").value = "";
});
