import {
  getFirestore,
  collection,
  getDocs,
  doc,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";

export default async function getFavorites(userId) {
  const db = getFirestore();

  try {
    const favoritesRef = collection(doc(db, "users", userId), "favorites");

    const favoritesQuery = query(favoritesRef, where("userId", "==", userId));
    const favoritesSnapshot = await getDocs(favoritesQuery);

    if (favoritesSnapshot.empty) {
      console.log("No favorites found.");
      return [];
    }

    const allFavorites = favoritesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("All favorites fetched:", allFavorites);
    return allFavorites;
  } catch (error) {
    console.error("Error getting favorites:", error);
    return [];
  }
}

export async function getInterests(userId, type) {
  const db = getFirestore();

  try {
    const interestsRef = collection(doc(db, "users", userId), type);

    const interestsQuery = query(interestsRef, where("userId", "==", userId));
    const interestsSnapshot = await getDocs(interestsQuery);

    if (interestsSnapshot.empty) {
      console.log("No interests found.");
      return [];
    }

    const allIntersts = interestsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(`All ${type} fetched:`, allIntersts);
    return allIntersts;
  } catch (error) {
    console.error(`Error getting ${type}:`, error);
    return [];
  }
}

export async function deleteInterests(userId, type, tech) {
  const db = getFirestore();
  try {
    const colRef = collection(db, "users", userId, type);
    const q = query(colRef, where("technology", "==", tech));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("Document not found.");
      return;
    }

    await Promise.all(
      querySnapshot.docs.map((docSnap) => {
        const docRef = doc(db, "users", userId, type, docSnap.id);
        return deleteDoc(docRef);
      })
    );
  } catch (error) {
    console.error("Error:", error);
  }
}
