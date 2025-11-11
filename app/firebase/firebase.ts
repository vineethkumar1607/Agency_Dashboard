// app/firebase/firebase.ts

/**
 * Firebase initialization file.
 * This sets up Firebase SDK and exports the required services
 * for Authentication and Firestore throughout the app.
 */

import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Export Authentication and Firestore instances
export const auth = getAuth(app);
export const db = getFirestore(app);

setPersistence(auth, browserLocalPersistence);
console.log("Firebase initialized:", import.meta.env.VITE_FIREBASE_PROJECT_ID);


// Export the initialized app if needed elsewhere
export default app;
