import { getFirestore, collection, getDocs, doc } from "firebase/firestore";

export const getQuestions = async (userId) => {
  const db = getFirestore();
  if (!userId) {
    console.log("User is not signed in.");
    return;
  }

  try {
    const userRef = doc(db, "users", userId);
    const postsRef = collection(userRef, "posts");

    const querySnapshot = await getDocs(postsRef);
    const posts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("User's posts:", posts);
    return posts;
  } catch (error) {
    console.error("Error getting posts:", error);
  }
};
