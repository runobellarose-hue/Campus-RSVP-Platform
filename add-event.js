// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOMgHBPWWiHI0T0a4Nhetj48_0oh3QqKc",
  authDomain: "campusevents-ecc9d.firebaseapp.com",
  projectId: "campusevents-ecc9d",
  storageBucket: "campusevents-ecc9d.firebasestorage.app",
  messagingSenderId: "1007793862301",
  appId: "1:1007793862301:web:94a5797fa68538c034c674"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase (paste your config from Firebase console)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// On form submit:
db.collection("events").add({
  title: document.getElementById("title").value,
  description: document.getElementById("description").value,
  date: document.getElementById("date").value,
  time: document.getElementById("time").value,
  location: document.getElementById("location").value,
  category: document.getElementById("category").value,
  image: document.getElementById("image").value || "https://via.placeholder.com/300x160"
})
.then(() => {
  alert("Event published!");
  window.location.href = "home.html";
})
.catch(error => console.error("Error:", error));
