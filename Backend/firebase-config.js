// firebase-config.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // <-- ADD FIRESTORE
import { getStorage } from "firebase/storage";     // <-- ADD STORAGE
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoWfkFL1FuhUzF_weBwycevYXNMueW9aY",
  authDomain: "mmugreenmap.firebaseapp.com",
  projectId: "mmugreenmap",
  storageBucket: "mmugreenmap.firebasestorage.app",
  messagingSenderId: "678585530236",
  appId: "1:678585530236:web:23ecc24deb1b1d5f94d6f9",
  measurementId: "G-C48WRB5NQG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// 3. EXPORT the services so other files can use them
export const db = getFirestore(app);     // Data Reader and Writer will import 'db'
export const storage = getStorage(app);  // Media Specialist will import 'storage'
// Now, other files can import 'db'