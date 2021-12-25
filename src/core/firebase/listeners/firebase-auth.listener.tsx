import { CurrentUser } from "../firebase.types";
import { Firebase } from "../contexts";
import React from "react";
import { UserAction } from "../../redux/reducers/user/user.action";
import { connect } from "react-redux";
import { onAuthStateChanged } from "@firebase/auth";

interface FirebaseAuthListenerProps {
  userSessionStart: (user: CurrentUser) => void;
  userSessionEnd: () => void;
}
interface FirebaseAuthListenerState {
  user: CurrentUser;
}

class FirebaseAuthListenerInternal extends React.Component<
  React.PropsWithChildren<FirebaseAuthListenerProps>,
  FirebaseAuthListenerState
> {
  static contextType = Firebase;

  constructor(props: FirebaseAuthListenerProps) {
    super(props);
    this.state = {
      user: undefined,
    };
  }

  componentDidMount() {
    onAuthStateChanged(this.context.firebaseAuth, (user) => {
      if (user) {
        this.props.userSessionStart(user);
      } else {
        this.props.userSessionEnd();
      }
    });
  }

  render() {
    return this.props.children;
  }
}

export const FirebaseAuthListener = connect(null, (dispatch: any) => {
  const { userSessionStart, userSessionEnd } = UserAction(dispatch);
  return {
    userSessionStart,
    userSessionEnd,
  };
})(FirebaseAuthListenerInternal);
