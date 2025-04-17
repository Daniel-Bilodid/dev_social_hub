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

    if (Array.isArray(technology)) {
      const alreadyInInterests = technology.some(
        (tech) =>
          technologysSnapshot.docs.some((doc) => doc.data().technology === tech) // add filter to check if any of the technologies are already in interests
      );
      if (alreadyInInterests) {
        console.log("Technology already in interests.");
        return;
      }
      await Promise.all(
        technology.map((tech) =>
          addDoc(technologysRef, {
            technology: tech,
            userId,
            createdAt: new Date(),
          })
        )
      );
      console.log("Added to interests.");
    } else {
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
    }
  } catch (error) {
    console.error("Error adding to interests:", error);
  }
}
