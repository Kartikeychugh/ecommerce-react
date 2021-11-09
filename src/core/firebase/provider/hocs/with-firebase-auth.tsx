import {
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "@firebase/auth";
import { WithFirebaseProps, withFirebase } from "./with-firebase";

import React from "react";

export interface WithFirebaseAuthProps {
  signOut: () => Promise<void>;
  signInWithGooglePopup: () => Promise<UserCredential>;
  signInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<UserCredential>;
  createUserWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<UserCredential>;
}

export const withFirebaseAuth = <P extends {}>(
  WrapperComponent: React.ComponentType<P & WithFirebaseAuthProps>
) => {
  return withFirebase((props: P & WithFirebaseProps) => {
    const { firebaseAuth, googleProvider } = props;
    return (
      <WrapperComponent
        {...props}
        signOut={() => signOut(firebaseAuth)}
        signInWithGooglePopup={() =>
          signInWithPopup(firebaseAuth, googleProvider)
        }
        signInWithEmailAndPassword={(email: string, password: string) =>
          signInWithEmailAndPassword(firebaseAuth, email, password)
        }
        createUserWithEmailAndPassword={(email: string, password: string) =>
          createUserWithEmailAndPassword(firebaseAuth, email, password)
        }
      />
    );
  });
};
