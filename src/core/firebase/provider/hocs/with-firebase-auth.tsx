import {
  Auth,
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "@firebase/auth";
import { Firestore, doc, setDoc } from "@firebase/firestore";
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
    password: string,
    displayName: string
  ) => Promise<void>;
}

export const withFirebaseAuth = <P,>(
  WrapperComponent: React.ComponentType<P & WithFirebaseAuthProps>
) => {
  return withFirebase((props: P & WithFirebaseProps) => {
    const { firebaseAuth, googleProvider, firebaseStore } = props;
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
        createUserWithEmailAndPassword={(
          email: string,
          password: string,
          displayName: string
        ) =>
          _createUserWithEmailAndPassword(
            firebaseAuth,
            firebaseStore,
            email,
            password,
            displayName
          )
        }
      />
    );
  });
};

const _createUserWithEmailAndPassword = async (
  firebaseAuth: Auth,
  firebaseStore: Firestore,
  email: string,
  password: string,
  displayName: string
) => {
  const { user } = await createUserWithEmailAndPassword(
    firebaseAuth,
    email,
    password
  );
  await updateProfile(user, { displayName });
  await _updateUserProfileDocument(firebaseStore, user, {
    displayName: user.displayName,
    email: user.email,
    createdAt: new Date(),
  });
  return;
};

const _updateUserProfileDocument = async (
  store: Firestore,
  user: User,
  data: {} = {}
) => {
  const docRef = doc(store, `users/${user.uid}`);

  try {
    await setDoc(docRef, {
      ...data,
    });
    console.log("Updated profile");
  } catch (e) {
    console.log(e);
  }

  return docRef;
};
