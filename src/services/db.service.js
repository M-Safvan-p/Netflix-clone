import {
  collection,
  query,
  orderBy,
  getDocs,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firestore";
import { auth } from "../firebase/auth";

/**
 * Add movie to user's watchlist
 * Stores ONLY minimal snapshot data
 */
export const addToWatchlist = async (movie) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const ref = doc(db, "users", user.uid, "watchlist", String(movie.id));

  await setDoc(ref, {
    movieId: movie.id,
    title: movie.title,
    posterPath: movie.poster_path ?? movie.backdrop_path,
    mediaType: "movie",
    addedAt: serverTimestamp(),
  });
};

/**
 * Remove movie from watchlist
 */
export const removeFromWatchlist = async (movieId) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const ref = doc(db, "users", user.uid, "watchlist", String(movieId));
  await deleteDoc(ref);
};

/**
 * Check if movie exists in watchlist
 */
export const isInWatchlist = async (movieId) => {
  const user = auth.currentUser;
  if (!user) return false;

  const ref = doc(db, "users", user.uid, "watchlist", String(movieId));
  const snap = await getDoc(ref);

  return snap.exists() === true;
};

/**
 * Get user's watchlist (for Watchlist page)
 */
export const getWatchlist = async (uid) => {
  console.log("Fetching watchlist for UID:", uid);

  const q = query(
    collection(db, "users", uid, "watchlist"),
    orderBy("addedAt", "desc")
  );

  const snapshot = await getDocs(q);
  console.log("Snapshot fetched, docs:", snapshot.docs.length);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};