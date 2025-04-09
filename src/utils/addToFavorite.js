import {
  getFirestore,
  collection,
  getDocs,
  doc,
  addDoc,
} from "firebase/firestore";

export default async function AddToFavorite(postId, userId) {
  const db = getFirestore();
  if (!userId) {
    console.log("User is not signed in.");
    return;
  }

  try {
    const favoritesRef = collection(doc(db, "users", userId), "favorites");

    const favoritesSnapshot = await getDocs(favoritesRef);
    const alreadyFavorited = favoritesSnapshot.docs.some(
      (doc) => doc.data().postId === postId
    );
    if (alreadyFavorited) {
      console.log("Post already in favorites.");
      return;
    }

    await addDoc(favoritesRef, {
      postId,
      userId,
      createdAt: new Date(),
    });
    console.log("Added to favorites.");
  } catch (error) {
    console.error("Error adding to favorites:", error);
  }
}
