import { CurrentUser } from "../firebase.types";
import { Firebase } from "../contexts";
import React from "react";
import { connect } from "react-redux";
import { onAuthStateChanged } from "@firebase/auth";
import { setUser } from "../../redux";

interface FirebaseAuthListenerProps {
  setUser: (user: CurrentUser) => void;
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
      this.props.setUser(user);
    });
  }

  render() {
    return this.props.children;
  }
}

export const FirebaseAuthListener = connect(null, (dispatch: any) => {
  return {
    setUser: (user: CurrentUser) => {
      dispatch(setUser(user));
    },
  };
})(FirebaseAuthListenerInternal);
