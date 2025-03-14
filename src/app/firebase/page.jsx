"use client";
import { useAuth } from "@clerk/nextjs";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const signIntoFirebaseWithClerk = async (getToken) => {
  try {
    const token = await getToken({ template: "integration_firebase" });
    if (token) {
      const userCredentials = await signInWithCustomToken(auth, token);
      console.log("User signed in with Firebase:", userCredentials.user);
      return userCredentials.user;
    } else {
      console.error("No token received from Clerk");
    }
  } catch (error) {
    console.error("Error signing into Firebase with Clerk:", error);
  }
};

export const authenticateWithClerkAndFirebase = async (getToken) => {
  try {
    const token = await getToken({ template: "integration_firebase" });
    if (token) {
      await signIntoFirebaseWithClerk(getToken);
    } else {
      console.error("No token received from Clerk");
    }
  } catch (error) {
    console.error("Error authenticating:", error);
  }
};
