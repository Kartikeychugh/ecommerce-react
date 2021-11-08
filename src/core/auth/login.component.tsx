import {
  DocumentData,
  DocumentSnapshot,
  getFirestore,
} from "firebase/firestore";
import { Unsubscribe, User } from "../firebase";
import {
  createUserProfileDocument,
  subscribeToUserProfile,
} from "../../services/db";

import { CurrentUser } from "../../models";
import { FirebaseApp } from "@firebase/app";
import React from "react";
import { connect } from "react-redux";
import { setCurrentUser } from "../redux";
import { withFirebaseapp } from "../firebase/provider/firebase-app.provider";
import { withUser } from "./with-user.component";

type DispatchProps = {
  setCurrentUser: (user: CurrentUser) => void;
};

type LoginOwnProps = {};

type FirebaseAppProps = {
  firebaseApp: FirebaseApp;
};

type UserProps = {
  user: User | null | undefined;
};
class LoginInternal extends React.Component<
  React.PropsWithChildren<
    DispatchProps & LoginOwnProps & FirebaseAppProps & UserProps
  >,
  {}
> {
  private unsubscribe: Unsubscribe | undefined;

  public componentDidUpdate() {
    const { user } = this.props;
    if (user) {
      /**
       * When the profile gets updated in backend only then try to
       * complete the sign-in
       */
      this.unsubscribe = subscribeToUserProfile(
        getFirestore(this.props.firebaseApp),
        user,
        (snapShot: DocumentSnapshot<DocumentData>) => {
          this.completeSignIn(snapShot);
        }
      );

      this.addProfileToFireStore(user);
    } else {
      this.props.setCurrentUser(user);
    }
  }

  public componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
  }

  public render() {
    return this.props.children;
  }

  private async addProfileToFireStore(user: User) {
    await createUserProfileDocument(
      getFirestore(this.props.firebaseApp),
      user,
      {
        displayName: user.displayName,
        email: user.email,
        createdAt: new Date(),
      }
    );
  }

  private completeSignIn(snapShot: DocumentSnapshot<DocumentData>) {
    const user = snapShot.data();
    if (snapShot.id && user && this.validUserProfile(user as CurrentUser)) {
      this.props.setCurrentUser({
        id: snapShot.id,
        email: user.email,
        displayName: user.displayName,
        createdAt: user.createdAt,
      });
    }
  }

  private validUserProfile(user: CurrentUser) {
    return user && user.email && user.displayName;
  }
}

export const Login = connect(null, (dispatch) => {
  return {
    setCurrentUser: (user: CurrentUser) => dispatch(setCurrentUser(user)),
  };
})(withFirebaseapp(withUser(LoginInternal)));
