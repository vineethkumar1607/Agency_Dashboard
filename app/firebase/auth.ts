// src/services/firebaseAuth.ts

import {
  GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, onAuthStateChanged, signOut,
} from "firebase/auth";

import type { User } from "firebase/auth";

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  Firestore,
} from "firebase/firestore";
import { auth, db } from "./firebase";

const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("email");
googleProvider.addScope("profile");

// Define the shape of our Firestore user document
export interface FirestoreUser {
  name: string;
  email: string;
  imageUrl: string | null;
  joinedAt: string;
  accountId: string;
  status: string;
  $createdAt?: any;
  $updatedAt?: any;
}

/**
 * Start Google OAuth login using Firebase popup.
 */
export const loginWithGoogle = async (): Promise<User> => {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;
  await storeUserData(user);
  console.log("User signed in successfully:", user.uid);
  return user;
};

/**
 * Fetch existing user by accountId (Firebase UID).
 */
export const getExistingUser = async (
  accountId: string
): Promise<FirestoreUser | null> => {
  const userRef = doc(db, "users", accountId);
  const userSnap = await getDoc(userRef);
  return userSnap.exists() ? (userSnap.data() as FirestoreUser) : null;
};

/**
 * Create or update Firestore user document.
 */
export const storeUserData = async (user: User): Promise<FirestoreUser> => {
  if (!user?.uid) throw new Error("User not authenticated");

  const userRef = doc(db, "users", user.uid);
  const existingUser = await getExistingUser(user.uid);

  const userData: FirestoreUser = {
    name: user.displayName || existingUser?.name || "",
    email: user.email || existingUser?.email || "",
    imageUrl: user.photoURL || existingUser?.imageUrl || null,
    joinedAt: existingUser?.joinedAt || new Date().toISOString(),
    accountId: user.uid,
    status: existingUser?.status || "user",
    $updatedAt: serverTimestamp(),
    ...(existingUser ? {} : { $createdAt: serverTimestamp() }),
  };

  await setDoc(userRef, userData, { merge: true });
  console.log(
    existingUser
      ? `[storeUserData] Updated existing user: ${user.uid}`
      : `[storeUserData] Created new user: ${user.uid}`
  );

  return userData;
};


/**
 * Listen to authentication state changes.
 */
export const listenToAuthChanges = (
  callback: (user: User | null) => void
): (() => void) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * Logout the current user.
 */
export const logoutUser = async (): Promise<boolean> => {
  await signOut(auth);
  console.log("User logged out successfully");
  return true;
};

/**
 * Handle redirect login (optional).
 */
export const handleRedirectResult = async (): Promise<User | null> => {
  const result = await getRedirectResult(auth);
  if (result?.user) {
    await storeUserData(result.user);
    console.log("Redirect login successful:", result.user.uid);
    return result.user;
  }
  return null;
};
