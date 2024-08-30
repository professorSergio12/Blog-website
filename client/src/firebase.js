// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-4a002.firebaseapp.com",
  projectId: "mern-blog-4a002",
  storageBucket: "mern-blog-4a002.appspot.com",
  messagingSenderId: "424735900168",
  appId: "1:424735900168:web:b30dae7f37ff39479d47bd",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
