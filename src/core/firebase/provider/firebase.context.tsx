import { Auth, GoogleAuthProvider, getAuth } from "@firebase/auth";
import { FirebaseApp, FirebaseOptions, initializeApp } from "@firebase/app";
import { Firestore, getFirestore } from "@firebase/firestore";

import React from "react";

export interface FirebaseContext {
  firebaseApp: FirebaseApp;
  firebaseAuth: Auth;
  firebaseStore: Firestore;
  googleProvider: GoogleAuthProvider;
}

export const Firebase = React.createContext<FirebaseContext>(undefined!);

interface FirebaseProviderProps {
  config: FirebaseOptions;
}

interface FirebaseProviderState extends FirebaseContext {}

export class FirebaseProvider extends React.Component<
  FirebaseProviderProps,
  FirebaseProviderState
> {
  constructor(props: FirebaseProviderProps) {
    super(props);
    const firebaseApp = initializeApp(this.props.config);
    const firebaseAuth = getAuth(firebaseApp);
    const firebaseStore = getFirestore(firebaseApp);
    const googleProvider = new GoogleAuthProvider();

    this.state = {
      firebaseApp,
      firebaseAuth,
      firebaseStore,
      googleProvider,
    };
  }

  render() {
    return (
      <Firebase.Provider value={this.state}>
        {this.props.children}
      </Firebase.Provider>
    );
  }
}

export const FirebaseConsumer = Firebase.Consumer;
