import {
  getFirestore,
  collection,
  getDocs,
  doc,
  query,
  where,
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

export async function getInterests(userId) {
  const db = getFirestore();

  try {
    const interestsRef = collection(doc(db, "users", userId), "interests");

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
    console.log("All interests fetched:", allIntersts);
    return allIntersts;
  } catch (error) {
    console.error("Error getting interests:", error);
    return [];
  }
}
