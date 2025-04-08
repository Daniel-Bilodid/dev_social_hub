import { getFirestore, collection, getDocs } from "firebase/firestore";

export const getTags = async () => {
  const db = getFirestore();

  try {
    const tagRef = collection(db, "tags");
    const tagsSnapshot = await getDocs(tagRef);

    if (tagsSnapshot.empty) {
      console.log("No tags found.");
      return [];
    }

    const allTags = tagsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("All tags fetched:", allTags);
    return allTags;
  } catch (error) {
    console.error("Error getting tags:", error);
    return [];
  }
};
