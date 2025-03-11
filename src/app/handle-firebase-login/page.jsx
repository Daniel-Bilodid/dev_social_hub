import { getAuth, signInWithCustomToken } from "firebase/auth";
import { useAuth } from "@clerk/nextjs";

const auth = getAuth();

const handleFirebaseLogin = async () => {
  try {
    const { getToken } = useAuth();
    const token = await getToken({ template: "firebase_auth_template" });

    if (!token) {
      console.error("No token received");
      return;
    }

    await signInWithCustomToken(auth, token);
    console.log("Logged into Firebase!");
  } catch (error) {
    console.error("Firebase login error:", error);
  }
};

<button onClick={handleFirebaseLogin}>Login with Firebase</button>;
