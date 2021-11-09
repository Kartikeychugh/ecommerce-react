import { Auth, GoogleAuthProvider } from "@firebase/auth";

import { FirebaseApp } from "@firebase/app";
import { FirebaseConsumer } from "../firebase.context";
import { Firestore } from "@firebase/firestore";
import React from "react";

export interface WithFirebaseProps {
  firebaseApp: FirebaseApp;
  firebaseAuth: Auth;
  firebaseStore: Firestore;
  googleProvider: GoogleAuthProvider;
}

export const withFirebase = <P,>(
  WrapperComponent: React.ComponentType<P & WithFirebaseProps>
) => {
  return (props: P) => (
    <FirebaseConsumer>
      {({ firebaseApp, firebaseAuth, firebaseStore, googleProvider }) => {
        return (
          <WrapperComponent
            {...props}
            firebaseApp={firebaseApp}
            firebaseAuth={firebaseAuth}
            firebaseStore={firebaseStore}
            googleProvider={googleProvider}
          />
        );
      }}
    </FirebaseConsumer>
  );
};
