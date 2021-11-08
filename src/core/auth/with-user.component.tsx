import { User, getAuth, onAuthStateChanged } from "@firebase/auth";

import { FirebaseApp } from "../firebase/provider/firebase-app.context";
import React from "react";

type WithUserStateType = {
  user: User | null | undefined;
};

export function withUser<P>(
  WrappedComponent: React.ComponentType<{ user: User | null | undefined } & P>
) {
  return class extends React.Component<P, WithUserStateType> {
    static contextType = FirebaseApp;
    constructor(props: P) {
      super(props);
      this.state = {
        user: undefined,
      };
    }
    componentDidMount() {
      let app = this.context;
      onAuthStateChanged(getAuth(app), (user) => {
        this.setState({ user });
      });
    }

    render() {
      return <WrappedComponent user={this.state.user} {...this.props} />;
    }
  };
}
