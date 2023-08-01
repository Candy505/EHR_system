// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDl-gSwF0e4vMl4kTQwSLV5fC439pkeaq8",
  authDomain: "fir-learn-13ae8.firebaseapp.com",
  projectId: "fir-learn-13ae8",
  storageBucket: "fir-learn-13ae8.appspot.com",
  messagingSenderId: "773042403281",
  appId: "1:773042403281:web:489ffee33a1cb43ab0d2f0"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);


