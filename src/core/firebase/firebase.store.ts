import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  DocumentReference,
  DocumentData,
  onSnapshot,
} from "firebase/firestore";
import { firebase_app } from "./firebase.app";

const store = getFirestore(firebase_app);

const firebase_getDocRef = (path: string, ...pathSegments: string[]) =>
  doc(store, path, ...pathSegments);
const firebase_getDocSnap = (docRef: DocumentReference<DocumentData>) =>
  getDoc(docRef);
const firebase_setDocSnap = (
  docRef: DocumentReference<DocumentData>,
  data: {
    [x: string]: any;
  }
) => setDoc(docRef, data);

export const firebaseStore = {
  firebase_getDocRef,
  firebase_getDocSnap,
  firebase_setDocSnap,
  firebase_onSnapshot: onSnapshot,
};
