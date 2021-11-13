import { FirebaseUser, FirebaseUserContext } from "../contexts";

import React from "react";

export const FirebaseUserConsumer = FirebaseUser.Consumer;

export interface WithFirebaseUserProps extends FirebaseUserContext {}

export const withFirebaseUser = <P,>(
  WrappedComponent: React.ComponentType<P & WithFirebaseUserProps>
) => {
  return (props: P) => (
    <FirebaseUserConsumer>
      {(firebaseUserConsumerProps) => {
        return <WrappedComponent {...props} {...firebaseUserConsumerProps} />;
      }}
    </FirebaseUserConsumer>
  );
};
