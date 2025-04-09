import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  documentId,
} from "firebase/firestore";

export const getQuestions = async () => {
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

export const getResponses = async (postId) => {
  const db = getFirestore();

  try {
    const responsesRef = collection(db, "posts", postId, "responses");

    const responsesSnapshot = await getDocs(responsesRef);

    if (responsesSnapshot.empty) {
      console.log("No responses found.");
      return [];
    }
    const allResponses = responsesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("All responses fetched:", allResponses);
    return allResponses;
  } catch (error) {
    console.error("Error getting posts:", error);
    return [];
  }
};

export default async function getQuestionsById(postId) {
  const db = getFirestore();

  try {
    const postsRef = collection(db, "posts");

    const postsQuery = query(postsRef, where(documentId(), "==", postId));
    const postsSnapshot = await getDocs(postsQuery);

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
}
