// ============================================================
// FIREBASE CONFIGURATION
// 1. Go to https://console.firebase.google.com
// 2. Create a project → Add a web app → copy the config below
// 3. In Firebase console: Build → Realtime Database → Create database
//    Choose your region, start in test mode (you can lock it down later)
// 4. Replace every "YOUR_..." value below with your actual values
// ============================================================
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBz9N2jI9ooywT0ac36a5Pnn9Kthdw5WoE",
  authDomain: "aaradhna--billing.firebaseapp.com",
  databaseURL:
    "https://aaradhna--billing-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "aaradhna--billing",
  storageBucket: "aaradhna--billing.firebasestorage.app",
  messagingSenderId: "738588140413",
  appId: "1:738588140413:web:7192c75ffd9924fcdf2214",
  measurementId: "G-RDQS7ZH48X",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
