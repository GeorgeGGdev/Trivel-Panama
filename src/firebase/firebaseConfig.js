// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtdp92K-hArUEx9V0BNUyEYIeiBW6mdX4",
  authDomain: "expo-project-6b69e.firebaseapp.com",
  projectId: "expo-project-6b69e",
  storageBucket: "expo-project-6b69e.firebasestorage.app",
  messagingSenderId: "618070090368",
  appId: "1:618070090368:web:d095d8e251209ac38b7c65",
  measurementId: "G-T3R44M6EYF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, analytics };