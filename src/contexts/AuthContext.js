import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';
import {
  doc, setDoc, getDoc, getDocs, collection, serverTimestamp, query, orderBy,
} from 'firebase/firestore';
import { auth, db } from '../firebase';

const ADMIN_EMAIL = 'mquachie@gmail.com';
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const isAdmin = firebaseUser.email === ADMIN_EMAIL;
        try {
          const ref = doc(db, 'users', firebaseUser.uid);
          const snap = await getDoc(ref);
          if (snap.exists()) {
            const data = snap.data();
            // Always enforce isAdmin based on email, fix the record if needed
            if (isAdmin && !data.isAdmin) {
              await setDoc(ref, { ...data, isAdmin: true }, { merge: true });
            }
            setUser({ id: firebaseUser.uid, uid: firebaseUser.uid, ...data, isAdmin });
          } else {
            const profile = {
              name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
              email: firebaseUser.email,
              isAdmin,
              createdAt: serverTimestamp(),
            };
            await setDoc(ref, profile);
            setUser({ id: firebaseUser.uid, uid: firebaseUser.uid, ...profile });
          }
        } catch {
          setUser({ id: firebaseUser.uid, uid: firebaseUser.uid, email: firebaseUser.email, isAdmin });
        }
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    });
    return unsub;
  }, []);

  async function login(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (err) {
      console.error('Login error code:', err.code);
      return { success: false, error: friendlyError(err.code) };
    }
  }

  async function signup(name, email, password) {
    try {
      const { user: fb } = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', fb.uid), {
        name,
        email,
        isAdmin: email === ADMIN_EMAIL,
        createdAt: serverTimestamp(),
      });
      return { success: true };
    } catch (err) {
      return { success: false, error: friendlyError(err.code) };
    }
  }

  async function logout() {
    await signOut(auth);
  }

  async function resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (err) {
      return { success: false, error: friendlyError(err.code) };
    }
  }

  async function changePassword(currentPassword, newPassword) {
    try {
      const fb = auth.currentUser;
      const credential = EmailAuthProvider.credential(fb.email, currentPassword);
      await reauthenticateWithCredential(fb, credential);
      await updatePassword(fb, newPassword);
      return { success: true };
    } catch (err) {
      return { success: false, error: friendlyError(err.code) };
    }
  }

  async function getAllUsers() {
    try {
      const snap = await getDocs(query(collection(db, 'users'), orderBy('createdAt', 'desc')));
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch {
      return [];
    }
  }

  return (
    <AuthContext.Provider value={{ user, authLoading, login, signup, logout, resetPassword, changePassword, getAllUsers }}>
      {children}
    </AuthContext.Provider>
  );
}

function friendlyError(code) {
  const map = {
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password. Please check and try again.',
    'auth/invalid-credential': 'Incorrect email or password.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/weak-password': 'Password must be at least 6 characters.',
    'auth/too-many-requests': 'Too many failed attempts. Please wait a few minutes and try again.',
    'auth/requires-recent-login': 'Please sign in again before changing your password.',
    'auth/network-request-failed': 'Network error. Please check your connection.',
    'auth/operation-not-allowed': 'Email/Password sign-in is not enabled. Please enable it in the Firebase Console.',
    'auth/user-disabled': 'This account has been disabled.',
  };
  return map[code] || `Sign-in failed (${code}). Please try again.`;
}

export function useAuth() {
  return useContext(AuthContext);
}
