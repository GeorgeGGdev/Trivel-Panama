  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCBisFN9Hj3qU3BnEuqy0AZ5YiRgHMoTrw",
    authDomain: "expo-project-f56cd.firebaseapp.com",
    projectId: "expo-project-f56cd",
    storageBucket: "expo-project-f56cd.firebasestorage.app",
    messagingSenderId: "543456611898",
    appId: "1:543456611898:web:15b209c5eb3905dc0bef03",
    measurementId: "G-HKHP4LJ26J"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
