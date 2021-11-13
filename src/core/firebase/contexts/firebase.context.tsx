import { Auth, GoogleAuthProvider } from "firebase/auth";

import { FirebaseApp } from "firebase/app";
import { Firestore } from "@firebase/firestore";
import React from "react";

export interface FirebaseContext {
  firebaseApp: FirebaseApp;
  firebaseAuth: Auth;
  firebaseStore: Firestore;
  googleProvider: GoogleAuthProvider;
}

export const Firebase = React.createContext<FirebaseContext>(undefined!);
