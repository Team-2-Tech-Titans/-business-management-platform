import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD61Gue-rUENexgavnP09XWs41BBGacRFY",
    authDomain: "titans-business-management.firebaseapp.com",
    projectId: "titans-business-management",
    storageBucket: "titans-business-management.appspot.com",
    messagingSenderId: "411216657078",
    appId: "1:411216657078:web:3d327158528610c6c24417",
    measurementId: "G-KQWJ8W1ZJ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };