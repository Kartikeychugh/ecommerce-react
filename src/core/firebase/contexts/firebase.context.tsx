import { Auth } from "firebase/auth";
import { Firestore } from "@firebase/firestore";
import React from "react";

export interface FirebaseContext {
  firebaseAuth: Auth;
  firebaseStore: Firestore;
}

export const Firebase = React.createContext<FirebaseContext>(undefined!);
