// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBoWfkFL1FuhUzF_weBwycevYXNMueW9aY",
  authDomain: "mmugreenmap.firebaseapp.com",
  projectId: "mmugreenmap",
  storageBucket: "mmugreenmap.firebasestorage.app",
  messagingSenderId: "678585530236",
  appId: "1:678585530236:web:23ecc24deb1b1d5f94d6f9",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
