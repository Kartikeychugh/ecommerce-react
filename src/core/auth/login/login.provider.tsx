import { DocumentSnapshot } from "firebase/firestore";
import React from "react";
import { CurrentUser, IUser } from "../../../models";
import {
  createUserProfileDocument,
  subscribeToUserProfile,
} from "../../../services/db";
import { firebaseAuth, Unsubscribe, User } from "../../firebase";
import { connect } from "react-redux";
import { RootState } from "../../redux";
import { setCurrentUser } from "../../redux/user/user.actions";

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
            user,
            (snapShot: DocumentSnapshot<IUser>) => {
              this.completeSignIm(snapShot);
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
    await createUserProfileDocument(user, {
      displayName: user.displayName,
      email: user.email,
      createdAt: new Date(),
    });
  }

  private completeSignIm(snapShot: DocumentSnapshot<IUser>) {
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
      currentUser: state.user.currentUser,
    };
  },
  (dispatch) => {
    return {
      setCurrentUser: (user: CurrentUser) => dispatch(setCurrentUser(user)),
    };
  }
)(LoginInternal);
