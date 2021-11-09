import { Auth, User, onAuthStateChanged, updateProfile } from "@firebase/auth";

import { FirebaseConsumer } from "../firebase.context";
import React from "react";

export interface WithFirebaseUserProps {
  user: User | null | undefined;
  updateProfile: (
    user: User,
    {
      displayName,
      photoURL: photoUrl,
    }: {
      displayName?: string | null | undefined;
      photoURL?: string | null | undefined;
    }
  ) => Promise<void>;
}

const _updateProfile = (
  user: User,
  {
    displayName,
    photoURL: photoUrl,
  }: {
    displayName?: string | null | undefined;
    photoURL?: string | null | undefined;
  }
) => {
  return updateProfile(user, {
    displayName,
    photoURL: photoUrl,
  });
};

const withFirebaseUserInternal = <P extends {}>(
  WrapperComponent: React.ComponentType<P & WithFirebaseUserProps>
) => {
  return class extends React.Component<
    P & { firebaseAuth: Auth },
    { user: User | null | undefined }
  > {
    constructor(props: P & { firebaseAuth: Auth }) {
      super(props);
      this.state = {
        user: undefined,
      };
    }

    componentDidMount() {
      onAuthStateChanged(this.props.firebaseAuth, (user) => {
        this.setState({ user });
      });
    }

    render() {
      return (
        <WrapperComponent
          {...this.props}
          user={this.state.user}
          updateProfile={_updateProfile}
        />
      );
    }
  };
};

export const withFirebaseUser = <P extends {}>(
  WrapperComponent: React.ComponentType<P & WithFirebaseUserProps>
) => {
  return (props: P) => (
    <FirebaseConsumer>
      {({ firebaseAuth }) => {
        const TempComponent = withFirebaseUserInternal(WrapperComponent);
        return <TempComponent {...props} firebaseAuth={firebaseAuth} />;
      }}
    </FirebaseConsumer>
  );
};
