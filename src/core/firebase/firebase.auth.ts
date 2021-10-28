// Import the functions you need from the SDKs you need
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
  onAuthStateChanged as _onAuthStateChanged,
  signOut as _signOut,
} from "firebase/auth";
import { getFirebaseApp } from "./firebase.initialiser";

const auth = getAuth(getFirebaseApp());

// export const database = getFirestore(app);
export const loginWithGoogle = () => {
  return signInWithPopup(auth, new GoogleAuthProvider()).then(
    (res) => res.user
  );
};

export const onAuthStateChanged = (callback: (user: User | null) => void) =>
  _onAuthStateChanged(auth, callback);

export const signOut = () => _signOut(auth);

export const Auth = {
  loginWithGoogle,
  onAuthStateChanged,
  signOut,
};
