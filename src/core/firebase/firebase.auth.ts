import {
  CompleteFn,
  ErrorFn,
  GoogleAuthProvider,
  NextOrObserver,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateCurrentUser,
  updateProfile,
} from "@firebase/auth";

import { User } from "./firebase.types";
import { firebase_app } from "./firebase.app";

// import { DocumentData, DocumentSnapshot } from "firebase/firestore";
// import { setCurrentUser, store } from "../redux";

// import { CurrentUser } from "../../models";
// import { doc } from "@firebase/firestore";
// import { store as firebaseStore } from "./firebase.store";
// import { subscribeToChanges } from "../../services/db";

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

// firebase_onAuthStateChanged(async (user) => {
//   if (user) {
//     const docRef = doc(firebaseStore, `users/${user.uid}`);
//     subscribeToChanges<DocumentData>(
//       docRef,
//       (snapShot: DocumentSnapshot<DocumentData>) => {
//         const user = snapShot.data();
//         if (snapShot.id && user && user.email && user.displayName) {
//           store.dispatch(
//             setCurrentUser({
//               id: snapShot.id,
//               email: user.email,
//               displayName: user.displayName,
//               createdAt: user.createdAt,
//             })
//           );
//         }
//       }
//     );
//   } else {
//     store.dispatch(setCurrentUser(user));
//   }
// });

export const firebaseAuth = {
  // firebase_signInWithGooglePopup,
  // firebase_createUserWithEmailAndPassword,
  // firebase_signInWithEmailAndPassword,
  // firebase_updateProfile,
};
