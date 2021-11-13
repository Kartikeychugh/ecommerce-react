import {
  Auth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "@firebase/auth";
import { Firebase, FirebaseAuth, FirebaseAuthContext } from "../contexts";
import { Firestore, doc, setDoc } from "@firebase/firestore";

import React from "react";
import { User } from "../firebase.types";

interface FirebaseAuthProviderProps {}
interface FirebaseAuthProviderState extends FirebaseAuthContext {}

export class FirebaseAuthProvider extends React.Component<
  FirebaseAuthProviderProps,
  FirebaseAuthProviderState
> {
  static contextType = Firebase;

  render() {
    const { firebaseAuth, googleProvider, firebaseStore } = this.context;
    return (
      <FirebaseAuth.Provider
        value={this.createContextValue(
          firebaseAuth,
          googleProvider,
          firebaseStore
        )}>
        {this.props.children}
      </FirebaseAuth.Provider>
    );
  }

  private createContextValue(
    firebaseAuth: Auth,
    googleProvider: GoogleAuthProvider,
    firebaseStore: Firestore
  ): FirebaseAuthContext {
    return {
      signOut: () => signOut(firebaseAuth),
      signInWithGooglePopup: () =>
        signInWithPopup(firebaseAuth, googleProvider),
      signInWithEmailAndPassword: (email: string, password: string) =>
        signInWithEmailAndPassword(firebaseAuth, email, password),
      createUserWithEmailAndPassword: (
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
        ),
    };
  }
}

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
