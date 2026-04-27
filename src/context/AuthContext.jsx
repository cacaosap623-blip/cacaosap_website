import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase"; 
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // FINAL REGISTER: Safely creates Auth account + Firestore profile
  const register = async (email, password, displayName = "Valued Customer") => {
    try {
      console.log("Starting Registration for:", email);
      
      // 1. Create the user in Firebase Authentication
      const res = await createUserWithEmailAndPassword(auth, email, password);
      
      // 2. Set the Display Name in the Auth Profile
      await updateProfile(res.user, { displayName });

      // 3. SAFE FIRESTORE STEP: 
      // We use a nested try/catch so if the Database fails, the login still succeeds!
      try {
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          displayName: displayName,
          email: email,
          role: "customer", // Default role for new users
          createdAt: serverTimestamp(), // Uses Firebase server time
        });
        console.log("Firestore profile created successfully!");
      } catch (firestoreErr) {
        console.error("Firestore Error (Profile not saved, but account created):", firestoreErr);
      }

      return res.user;
    } catch (error) {
      console.error("Auth Error Code:", error.code);
      throw error; // This goes back to Register.jsx to show the red error box
    }
  };

  // FINAL LOGIN
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // FINAL LOGOUT
  const logout = () => {
    return signOut(auth);
  };

  // TRACK AUTH STATE
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      console.log("Current User State:", user ? "Logged In" : "Logged Out");
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    register,
    login,
    logout,
    isAuthenticated: !!currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};