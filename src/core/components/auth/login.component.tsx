import { WithFirebaseUserProps, withFirebaseUser } from "../../firebase";

import { CurrentUser } from "../../../models";
import React from "react";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux";

type DispatchProps = {
  setCurrentUser: (user: CurrentUser) => void;
};

type LoginProps = DispatchProps & WithFirebaseUserProps;

class LoginInternal extends React.Component<
  React.PropsWithChildren<LoginProps>,
  {}
> {
  public componentDidUpdate() {
    const { user } = this.props;
    this.props.setCurrentUser(user);
  }

  public render() {
    return this.props.children;
  }
}

export const Login = connect(null, (dispatch) => {
  return {
    setCurrentUser: (user: CurrentUser) => dispatch(setCurrentUser(user)),
  };
})(withFirebaseUser(LoginInternal));
