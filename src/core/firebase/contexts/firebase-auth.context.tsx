import React from "react";
import { UserCredential } from "firebase/auth";

export interface FirebaseAuthContext {
  signOut: () => Promise<void>;
  signInWithGooglePopup: () => Promise<UserCredential>;
  signInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<UserCredential>;
  createUserWithEmailAndPassword: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<void>;
}

export const FirebaseAuth = React.createContext<FirebaseAuthContext>(
  undefined!
);
