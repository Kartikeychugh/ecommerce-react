import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  NextOrObserver,
  ErrorFn,
  CompleteFn,
  updateProfile,
  updateCurrentUser,
} from "@firebase/auth";
import { firebase_app } from "./firebase.app";
import { User } from "./firebase.types";

/** AUTH INSTANCE */
const firebase_auth = getAuth(firebase_app);

/** PROVIDERS */
const firebase_googleProvider = new GoogleAuthProvider();

/** SIGN IN METHODS */
export const firebase_signInWithGooglePopup = () =>
  signInWithPopup(firebase_auth, firebase_googleProvider);

export const firebase_createUserWithEmailAndPassword = (
  email: string,
  password: string
) => createUserWithEmailAndPassword(firebase_auth, email, password);

export const firebase_signInWithEmailAndPassword = (
  email: string,
  password: string
) => signInWithEmailAndPassword(firebase_auth, email, password);

/** SIGN OUT METHODS */
export const firebase_signOut = () => signOut(firebase_auth);

export const firebase_onAuthStateChanged = (
  nextOrObserver: NextOrObserver<User>,
  error?: ErrorFn | undefined,
  completed?: CompleteFn | undefined
) => onAuthStateChanged(firebase_auth, nextOrObserver);

export const firebase_updateProfile = (
  user: User,
  {
    displayName,
    photoURL: photoUrl,
  }: {
    displayName?: string | null | undefined;
    photoURL?: string | null | undefined;
  }
) =>
  updateProfile(user, {
    displayName,
    photoURL: photoUrl,
  });

export const firebase_updateCurrentUser = (user: User | null) =>
  updateCurrentUser(firebase_auth, user);

export const firebaseAuth = {
  firebase_signInWithGooglePopup,
  firebase_createUserWithEmailAndPassword,
  firebase_signInWithEmailAndPassword,
  firebase_signOut,
  firebase_onAuthStateChanged,
  firebase_updateProfile,
  firebase_updateCurrentUser,
  firebase_currentUser: () => firebase_auth.currentUser,
};
