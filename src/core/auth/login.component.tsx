import { CurrentUser, IUser } from "../../models";
import { Unsubscribe, User, firebaseAuth, store } from "../firebase";
import {
  createUserProfileDocument,
  subscribeToUserProfile,
} from "../../services/db";

import { DocumentSnapshot } from "firebase/firestore";
import React from "react";
import { connect } from "react-redux";
import { setCurrentUser } from "../redux";

type LoginProps = {
  setCurrentUser: (user: CurrentUser) => void;
};

class LoginInternal extends React.Component<
  React.PropsWithChildren<LoginProps>,
  {}
> {
  private unsubscribeAuth: Unsubscribe | undefined;

  public componentDidMount() {
    this.unsubscribeAuth = firebaseAuth.firebase_onAuthStateChanged(
      async (user) => {
        if (user) {
          /**
           * When the profile gets updated in backend only then try to
           * complete the sign-in
           */
          subscribeToUserProfile<IUser>(
            store,
            user,
            (snapShot: DocumentSnapshot<IUser>) => {
              this.completeSignIn(snapShot);
            }
          );

          await this.addProfileToFireStore(user);
        } else {
          this.props.setCurrentUser(user);
        }
      }
    );
  }

  public componentWillUnmount() {
    this.unsubscribeAuth && this.unsubscribeAuth();
  }

  public render() {
    return this.props.children;
  }

  private async addProfileToFireStore(user: User) {
    await createUserProfileDocument(store, user, {
      displayName: user.displayName,
      email: user.email,
      createdAt: new Date(),
    });
  }

  private completeSignIn(snapShot: DocumentSnapshot<IUser>) {
    const user = snapShot.data();
    if (snapShot.id && user && this.validUserProfile(user)) {
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
})(LoginInternal);
