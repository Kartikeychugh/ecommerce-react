import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  Firestore,
  doc,
  onSnapshot,
} from "@firebase/firestore";
import { Unsubscribe, User, onAuthStateChanged } from "@firebase/auth";

import { CurrentUser } from "../../firebase.types";
import { FirebaseConsumer } from "../firebase.context";
import React from "react";
import { WithFirebaseProps } from "./";

export interface WithFirebaseUserProps {
  user: CurrentUser | null | undefined;
}

const subscribeToChanges = <DocumentData,>(
  docRef: DocumentReference<DocumentData>,
  callback: (snapshot: DocumentSnapshot<DocumentData>) => void
) => {
  return onSnapshot(docRef, callback);
};

const subscribeToUserProfile = (
  store: Firestore,
  user: User,
  callback: (snapshot: DocumentSnapshot<DocumentData>) => void
) => {
  const docRef = doc(store, `users/${user.uid}`);
  return subscribeToChanges<DocumentData>(docRef, callback);
};

const withFirebaseUserInternal = <P extends {}>(
  WrapperComponent: React.ComponentType<P & WithFirebaseUserProps>
) => {
  return class extends React.Component<
    P & Pick<WithFirebaseProps, "firebaseAuth" | "firebaseStore">,
    { user: CurrentUser | null | undefined }
  > {
    private unsubscribe: Unsubscribe | undefined;

    constructor(
      props: P & Pick<WithFirebaseProps, "firebaseAuth" | "firebaseStore">
    ) {
      super(props);
      this.state = {
        user: undefined,
      };
    }

    componentDidMount() {
      onAuthStateChanged(this.props.firebaseAuth, (user) => {
        if (user) {
          /**
           * When the profile gets updated in backend only then try to
           * complete the sign-in
           */
          this.unsubscribe = subscribeToUserProfile(
            this.props.firebaseStore,
            user,
            (snapShot: DocumentSnapshot<DocumentData>) => {
              const user = snapShot.data();
              if (user && user.email && user.displayName) {
                this.setState({
                  user: {
                    id: snapShot.id,
                    email: user.email,
                    displayName: user.displayName,
                    createdAt: user.createdAt,
                  },
                });
              }
            }
          );
        } else {
          this.setState({ user });
        }
      });
    }

    componentWillUnmount() {
      this.unsubscribe && this.unsubscribe();
    }

    render() {
      return <WrapperComponent {...this.props} user={this.state.user} />;
    }
  };
};

export const withFirebaseUser = <P extends {}>(
  WrapperComponent: React.ComponentType<P & WithFirebaseUserProps>
) => {
  return (props: P) => (
    <FirebaseConsumer>
      {({ firebaseAuth, firebaseStore }) => {
        const TempComponent = withFirebaseUserInternal(WrapperComponent);
        return (
          <TempComponent
            {...props}
            firebaseAuth={firebaseAuth}
            firebaseStore={firebaseStore}
          />
        );
      }}
    </FirebaseConsumer>
  );
};
