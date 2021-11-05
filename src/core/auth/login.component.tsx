import { CurrentUser, IUser } from "../../models";
import { RootState, selectCurrentUser, setCurrentUser } from "../redux";
import { Unsubscribe, User, firebaseAuth, store } from "../firebase";
import {
  createUserProfileDocument,
  subscribeToUserProfile,
} from "../../services/db";

import { DocumentSnapshot } from "firebase/firestore";
import React from "react";
import { WithSpinner } from "../../components/with-spinner/with-spinner.component";
import { connect } from "react-redux";

type LoginProps = {
  currentUser: CurrentUser;
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
    return (
      <WithSpinner isLoading={this.props.currentUser === undefined}>
        {this.props.children}
      </WithSpinner>
    );
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

export const Login = connect(
  (state: RootState) => {
    return {
      currentUser: selectCurrentUser(state),
    };
  },
  (dispatch) => {
    return {
      setCurrentUser: (user: CurrentUser) => dispatch(setCurrentUser(user)),
    };
  }
)(LoginInternal);
