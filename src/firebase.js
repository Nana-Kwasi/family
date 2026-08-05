import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase now backs one thing only: the order records in CartContext. Accounts, stories,
// the shop and the culture pages all moved to our own backend.
//
// These values used to be committed here. A Firebase web config is not a secret in the way a
// private key is — it ships to every browser — but hard-coding it pins the app to one project
// and puts a live credential in version control, so it comes from the environment now.
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
