// public/JS/firebaseConfig.js
const firebaseConfig = {
  apiKey: "AIzaSyBtdp92K-hArUEx9V0BNUyEYIeiBW6mdX4",
  authDomain: "expo-project-6b69e.firebaseapp.com",
  projectId: "expo-project-6b69e",
  storageBucket: "expo-project-6b69e.appspot.com",
  messagingSenderId: "618070090368",
  appId: "1:618070090368:web:d095d8e251209ac38b7c65",
  measurementId: "G-T3R44M6EYF"
};

// Initialize Firebase
try {
  if (!firebase.apps || !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log('Firebase initialized successfully');
  } else {
    console.log('Firebase already initialized');
  }
} catch (error) {
  console.error('Error initializing Firebase:', error);
} 