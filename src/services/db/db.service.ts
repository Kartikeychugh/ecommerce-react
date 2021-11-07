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
  store: Firestore,
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

export const updateUserProfileDocument = async (
  store: Firestore,
  user: User,
  data: {} = {}
) => {
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
  onSnapshot(docRef, callback);
};

export const subscribeToUserProfile = (
  store: Firestore,
  user: User,
  callback: (snapshot: DocumentSnapshot<DocumentData>) => void
) => {
  const docRef = doc(store, `users/${user.uid}`);
  subscribeToChanges<DocumentData>(docRef, callback);
};
