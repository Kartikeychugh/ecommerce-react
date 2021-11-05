import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  QueryConstraint,
  addDoc,
  collection,
  doc,
  enableIndexedDbPersistence,
  getDoc,
  getDocFromCache,
  getDocs,
  getDocsFromCache,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  writeBatch,
} from "firebase/firestore";

import { firebase_app } from "./firebase.app";

export const store = getFirestore(firebase_app);
// enableIndexedDbPersistence(store);
const firebase_getDocRef = (path: string, ...pathSegments: string[]) =>
  doc(store, path, ...pathSegments);
const firebase_getDoc = (colRef: CollectionReference<DocumentData>) =>
  doc(colRef);
const firebase_getDocSnap = (docRef: DocumentReference<DocumentData>) =>
  getDoc(docRef);
const firebase_setDocSnap = (
  docRef: DocumentReference<DocumentData>,
  data: {
    [x: string]: any;
  }
) => setDoc(docRef, data);
const firebase_getCollectionRef = (path: string, ...pathSegments: string[]) =>
  collection(store, path, ...pathSegments);
const firebase_getAllDocs = (colRef: CollectionReference<DocumentData>) =>
  getDocs(colRef);

const firebase_addDoc = (
  colRef: CollectionReference<DocumentData>,
  data?: {
    [x: string]: any;
  }
) => {
  return addDoc(colRef, data);
};

const firebase_query = query;

const firestore_batch = () => writeBatch(store);

enableIndexedDbPersistence(store);

export const firebaseStore = {
  firebase_getDocRef,
  firebase_getDocSnap,
  firebase_setDocSnap,
  firebase_onSnapshot: onSnapshot,
  firebase_getCollectionRef,
  firebase_getAllDocs,
  firebase_addDoc,
  firebase_getDoc,
  firestore_batch,
  firebase_query,
  x: () =>
    getDocFromCache(doc(store, "users/3NCqVYeADoEtf6VSmsJW"))
      .then((res) => {
        console.log(res.data());
      })
      .catch((e) => console.log(e)),
  getDocsFromCache: (q: any) => getDocsFromCache(q),
  query: (
    colRef: CollectionReference<DocumentData>,
    ...queryConstraints: QueryConstraint[]
  ) => query(colRef, ...queryConstraints),
};
