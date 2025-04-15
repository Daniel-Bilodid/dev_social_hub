import {
  getFirestore,
  collection,
  getDocs,
  doc,
  addDoc,
} from "firebase/firestore";

export default async function AddToInterests(technology, userId) {
  const db = getFirestore();
  if (!userId) {
    console.log("User is not signed in.");
    return;
  }

  try {
    const technologysRef = collection(doc(db, "users", userId), "interests");

    const technologysSnapshot = await getDocs(technologysRef);
    const alreadyInInterests = technologysSnapshot.docs.some(
      (doc) => doc.data().technology === technology
    );
    if (alreadyInInterests) {
      console.log("Technology already in interests.");
      return;
    }

    await addDoc(technologysRef, {
      technology,
      userId,
      createdAt: new Date(),
    });
    console.log("Added to interests.");
  } catch (error) {
    console.error("Error adding to interests:", error);
  }
}
