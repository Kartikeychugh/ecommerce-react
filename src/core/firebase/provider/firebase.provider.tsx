import { Firebase, FirebaseContext } from "../contexts";
import { FirebaseOptions, initializeApp } from "@firebase/app";

import React from "react";
import { getAuth } from "@firebase/auth";
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

    this.state = {
      ...this.initFirebase(),
    };
  }

  private initFirebase() {
    const firebaseApp = initializeApp(this.props.config);
    const firebaseAuth = getAuth(firebaseApp);
    const firebaseStore = getFirestore(firebaseApp);

    return { firebaseAuth, firebaseStore };
  }

  render() {
    return (
      <Firebase.Provider value={this.state}>
        {this.props.children}
      </Firebase.Provider>
    );
  }
}
