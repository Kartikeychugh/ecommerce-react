import { firebase_app } from "./firebase.app";
import { getFirestore } from "firebase/firestore";

export const store = getFirestore(firebase_app);
