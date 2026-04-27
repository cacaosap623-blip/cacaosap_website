import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB7ZdIlbvoJKCNyXl7kLpZ3Mq5O8sNJDng",
  authDomain: "cacao-app-d0db8.firebaseapp.com",
  databaseURL: "https://cacao-app-d0db8-default-rtdb.firebaseio.com",
  projectId: "cacao-app-d0db8",
  storageBucket: "cacao-app-d0db8.firebasestorage.app",
  messagingSenderId: "423995874653",
  appId: "1:423995874653:web:3600889b7025f9870c9cb4",
  measurementId: "G-Y9PDL6VQKK"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export for your AuthContext and Pages
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);