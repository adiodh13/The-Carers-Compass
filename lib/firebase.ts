// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

// Ensure a single app instance (important for Next.js hot reloads)
export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Auth (singleton) & Google provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
// Optional UX: force account chooser each time
googleProvider.setCustomParameters({ prompt: "select_account" });

// Firestore (singleton)
export const db = getFirestore(app);

// V1: Offline persistence disabled (keep commented out)
// import { enableIndexedDbPersistence } from "firebase/firestore";
// if (typeof window !== "undefined") {
//   enableIndexedDbPersistence(db).catch(() => {
//     // Ignore (incognito or multi-tab restriction)
//   });
// }
