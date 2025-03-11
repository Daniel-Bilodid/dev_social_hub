"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { auth, signInWithCustomToken } from "@/firebaseConfig";

export default function FirebaseAuth() {
  const { getToken } = useAuth();
  const [firebaseUser, setFirebaseUser] = useState(null);

  useEffect(() => {
    const authenticateWithFirebase = async () => {
      try {
        const token = await getToken({ template: "firebase_auth_template" });
        console.log("Received Firebase token:", token);
        const userCredential = await signInWithCustomToken(auth, token);
        console.log("Firebase Auth Success:", userCredential.user);
        setFirebaseUser(userCredential.user);
      } catch (error) {
        console.error("Firebase Auth Error:", error);
      }
    };

    authenticateWithFirebase();
  }, [getToken]);

  return (
    <div>
      {firebaseUser ? (
        <div>Firebase User: {firebaseUser.email || "Authenticated"}</div>
      ) : (
        <div>Loading Firebase User...</div>
      )}
    </div>
  );
}
