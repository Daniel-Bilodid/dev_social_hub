import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const getTechnologies = async (tag) => {
  const db = getFirestore();
  const postsRef = collection(db, "posts");

  const q = query(postsRef, where("technology", "array-contains", tag));

  try {
    const postsSnapshot = await getDocs(q);

    if (postsSnapshot.empty) {
      console.log("No posts found.");
      return [];
    }

    const filteredPosts = postsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("All posts fetched:", filteredPosts);
    return filteredPosts;
  } catch (error) {
    console.error("Error getting posts:", error);
    return [];
  }
};
