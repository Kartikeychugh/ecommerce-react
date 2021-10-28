import { FirebaseApp, initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase.config";

let app: FirebaseApp;

export const getFirebaseApp = () => {
  if (!app) {
    // Initialize Firebase
    app = initializeApp(firebaseConfig);
  }

  return app;
};
