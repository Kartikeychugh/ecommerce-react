import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  Firestore,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

import { User } from "firebase/auth";

export const createUserProfileDocument = async (
  store: Firestore | undefined,
  user: User,
  additionalData: {} = {}
) => {
  if (!store) {
    throw new Error("Store not initialised");
  }

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

export const updateUserProfileDocument = async (
  store: Firestore | undefined,
  user: User,
  data: {} = {}
) => {
  if (!store) {
    throw new Error("Store not initialised");
  }
  const docRef = doc(store, `users/${user.uid}`);

  try {
    await setDoc(docRef, {
      ...data,
    });
    console.log("Updated profile");
  } catch (e) {
    console.log(e);
  }

  return docRef;
};

export const subscribeToChanges = <DocumentData>(
  docRef: DocumentReference<DocumentData>,
  callback: (snapshot: DocumentSnapshot<DocumentData>) => void
) => {
  return onSnapshot(docRef, callback);
};

export const subscribeToUserProfile = (
  store: Firestore | undefined,
  user: User,
  callback: (snapshot: DocumentSnapshot<DocumentData>) => void
) => {
  if (!store) {
    throw new Error("Store not initialised");
  }

  const docRef = doc(store, `users/${user.uid}`);
  return subscribeToChanges<DocumentData>(docRef, callback);
};
