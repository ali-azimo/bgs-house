// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "bgs-imo-b1008.firebaseapp.com",
  projectId: "bgs-imo-b1008",
  storageBucket: "bgs-imo-b1008.firebasestorage.app",
  messagingSenderId: "229692291885",
  appId: "1:229692291885:web:4c854e9e32c12d508df1a4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);;