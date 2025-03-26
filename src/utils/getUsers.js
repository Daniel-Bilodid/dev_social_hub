import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const getUsers = async () => {
  const db = getFirestore();

  try {
    const postsRef = collection(db, "posts");

    const postsSnapshot = await getDocs(postsRef);

    if (postsSnapshot.empty) {
      console.log("No posts found.");
      return [];
    }

    const allPosts = postsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("All posts fetched:", allPosts);
    return allPosts;
  } catch (error) {
    console.error("Error getting posts:", error);
    return [];
  }
};
