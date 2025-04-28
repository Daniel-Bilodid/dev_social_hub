import {
  getFirestore,
  collection,
  getDocs,
  doc,
  addDoc,
} from "firebase/firestore";

export default async function AddToInterests(technology, userId, type) {
  const db = getFirestore();
  if (!userId) {
    console.log("User is not signed in.");
    return;
  }

  try {
    const technologysRef = collection(doc(db, "users", userId), type);
    const technologysSnapshot = await getDocs(technologysRef);

    const existingTech = technologysSnapshot.docs.map(
      (doc) => doc.data().technology
    );
    console.log(`Existing technologies in ${type}:`, existingTech);
    let newTech = [];

    if (Array.isArray(technology)) {
      newTech = technology.filter((tech) => !existingTech.includes(tech));

      if (newTech.length === 0) {
        console.log(`Technology already in ${type}.`);
        return;
      }
      console.log(`Adding new technologies to ${type}:`, newTech);
      await Promise.all(
        newTech.map((tech) =>
          addDoc(technologysRef, {
            technology: tech,
            userId,
            createdAt: new Date(),
          })
        )
      );
      console.log(`Added ${type}.`);
    } else {
      const alreadyInInterests = technologysSnapshot.docs.some(
        (doc) => doc.data().technology === technology
      );
      if (alreadyInInterests) {
        console.log(`Technology already in ${type}.`);
        return;
      }

      await addDoc(technologysRef, {
        technology,
        userId,
        createdAt: new Date(),
      });
      console.log(`Added to ${type}.`);
    }
  } catch (error) {
    console.error("Error adding to interests:", error);
  }
}
