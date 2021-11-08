import { FirebaseApp } from "./firebase-app.context";
import { FirebaseApp as IFirebaseApp } from "@firebase/app";
import React from "react";

export function withFirebaseapp<P>(
  WrapperComponent: React.ComponentType<P & { firebaseApp: IFirebaseApp }>
) {
  return class extends React.Component<P> {
    static contextType = FirebaseApp;

    render() {
      return <WrapperComponent {...this.props} firebaseApp={this.context} />;
    }
  };
}
