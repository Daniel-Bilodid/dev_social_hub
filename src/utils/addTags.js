import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default async function addTags(newTags, userId, user) {
  if (!userId) {
    console.log("User is not signed in.");
    return;
  }

  try {
    const tagsRef = collection(db, "tags");

    for (let i = 0; i < newTags.length; i++) {
      const tag = newTags[i];

      if (!tag || !tag.value) {
        console.error("Invalid tag format at index", i, ":", tag);
        continue;
      }

      const q = query(tagsRef, where("value", "==", tag.value));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        console.log(
          `Tag "${tag.value}" already exists. Skipping adding duplicate.`
        );
        continue;
      }

      await addDoc(tagsRef, {
        ...tag,
        userId: userId,
        username: user.username,
        imageUrl: user.imageUrl,
        createdAt: new Date(),
      });
      console.log(`Tag "${tag.value}" added successfully.`);
    }
  } catch (error) {
    console.error("Error adding tag:", error);
  }
}
