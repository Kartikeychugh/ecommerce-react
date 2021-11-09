import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import { Unsubscribe, User } from "@firebase/auth";
import {
  WithFirebaseProps,
  WithFirebaseUserProps,
  withFirebase,
  withFirebaseUser,
} from "../../firebase";
import {
  createUserProfileDocument,
  subscribeToUserProfile,
} from "../../../services/db";

import { CurrentUser } from "../../../models";
import React from "react";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux";

type DispatchProps = {
  setCurrentUser: (user: CurrentUser) => void;
};

type LoginProps = DispatchProps & WithFirebaseProps & WithFirebaseUserProps;

class LoginInternal extends React.Component<
  React.PropsWithChildren<LoginProps>,
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
        this.props.firebaseStore,
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
    await createUserProfileDocument(this.props.firebaseStore, user, {
      displayName: user.displayName,
      email: user.email,
      createdAt: new Date(),
    });
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
})(withFirebase(withFirebaseUser(LoginInternal)));
