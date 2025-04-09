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
