// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdQJYyYhdnDZTU07r29ws1lRN8zQF7xC8",
  authDomain: "task-app-f99f0.firebaseapp.com",
  projectId: "task-app-f99f0",
  storageBucket: "task-app-f99f0.appspot.com",
  messagingSenderId: "1087778674292",
  appId: "1:1087778674292:web:8d9a401d9cc4a451152321"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);