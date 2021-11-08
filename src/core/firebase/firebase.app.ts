import { firebaseConfig } from "./firebase.config";
import { initializeApp } from "@firebase/app";

export const firebase_app = initializeApp(firebaseConfig);
