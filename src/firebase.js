// firebase.js
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBRhv1Ad80TjVlaiury_SFsbkuNKq0G3HY",
  authDomain: "eliteprojet-f905b.firebaseapp.com",
  projectId: "eliteprojet-f905b",
  storageBucket: "eliteprojet-f905b.firebasestorage.app",
  messagingSenderId: "28766700263",
  appId: "1:28766700263:web:99d460f1eb478253075842",
  measurementId: "G-812WCCJH5J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db,storage };
