import { User } from "firebase/auth";
import { DocumentSnapshot } from "firebase/firestore";
import { firebaseStore } from "../../core/firebase";

export const createUserProfileDocument = async (
  user: User,
  additionalData: {} = {}
) => {
  const docRef = firebaseStore.firebase_getDocRef(`users/${user.uid}`);
  const docSnap = await firebaseStore.firebase_getDocSnap(docRef);

  if (!docSnap.exists()) {
    try {
      await firebaseStore.firebase_setDocSnap(docRef, {
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

export const updateUserProfileDocument = async (user: User, data: {} = {}) => {
  const docRef = firebaseStore.firebase_getDocRef(`users/${user.uid}`);

  try {
    await firebaseStore.firebase_setDocSnap(docRef, {
      ...data,
    });
    console.log("Updated profile");
  } catch (e) {
    console.log(e);
  }

  return docRef;
};

export const subscribeToChanges = (docRef: any, callback: any) => {
  firebaseStore.firebase_onSnapshot(docRef, callback);
};

export const subscribeToUserProfile = <T>(
  user: User,
  callback: (snapshot: DocumentSnapshot<T>) => void
) => {
  const docRef = firebaseStore.firebase_getDocRef(`users/${user.uid}`);
  subscribeToChanges(docRef, callback);
};
