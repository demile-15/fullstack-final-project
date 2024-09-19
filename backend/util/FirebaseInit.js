// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzXEpAra4aN9vGCsAAC0PHR_fYoyj_0rA",
  authDomain: "todo-app-3ee05.firebaseapp.com",
  projectId: "todo-app-3ee05",
  storageBucket: "todo-app-3ee05.appspot.com",
  messagingSenderId: "194053259889",
  appId: "1:194053259889:web:8b80387151a7ae3eee91d0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);