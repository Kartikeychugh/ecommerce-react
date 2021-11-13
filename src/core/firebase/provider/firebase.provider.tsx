import { Firebase, FirebaseContext } from "../contexts";
import { FirebaseOptions, initializeApp } from "@firebase/app";
import { GoogleAuthProvider, getAuth } from "@firebase/auth";

import React from "react";
import { getFirestore } from "@firebase/firestore";

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
