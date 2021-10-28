import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  DocumentReference,
  DocumentData,
  onSnapshot,
  DocumentSnapshot,
} from "firebase/firestore";

import { getFirebaseApp } from "./firebase.initialiser";
import { User } from "./firebase.types";

const store = getFirestore(getFirebaseApp());

const createUserProfileDocument = async (
  user: User,
  additionalData: {} = {}
) => {
  const docRef = doc(store, `users/${user.uid}`);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    try {
      await setDoc(docRef, {
        displayName: user.displayName,
        email: user.email,
        createdAt: new Date(),
        ...additionalData,
      });
      console.log("Created profile");
    } catch (e) {
      console.log(e);
    }
  }

  return docRef;
};

const subscribeToDocRef = (
  docRef: DocumentReference<DocumentData>,
  listener: (docSnap: DocumentSnapshot<DocumentData>) => void
) => {
  onSnapshot(docRef, listener);
};

export const Store = {
  createUserProfileDocument,
  subscribeToDocRef,
};
