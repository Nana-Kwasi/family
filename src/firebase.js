import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD7naswdN2FdKdgyO-pzHjVXzS-_cJ8zxs",
  authDomain: "fnb-file-system.firebaseapp.com",
  projectId: "fnb-file-system",
  storageBucket: "fnb-file-system.firebasestorage.app",
  messagingSenderId: "786392775660",
  appId: "1:786392775660:web:b363f7a1f0eb3697aa5ec9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
