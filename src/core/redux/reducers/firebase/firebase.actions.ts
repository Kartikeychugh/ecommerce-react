import { Action, Dispatch } from "redux";

import { FirebaseAuthSagaActions } from "./firebase-auth";
import { FirebaseStoreSagaActions } from "./firebase-store/firebase-store.types";

export const FirebaseActions = (dispatch: Dispatch<Action<any>>) => ({
  signInWithGooglePopup: () => {
    dispatch({
      type: FirebaseAuthSagaActions.GOOGLE_SIGN_IN,
    });
  },
  signInWithEmailAndPassword: (email: string, password: string) => {
    dispatch({
      type: FirebaseAuthSagaActions.EMAIL_PASSWORD_SIGN_IN,
      payload: {
        email,
        password,
      },
    });
  },
  signOut: () => {
    dispatch({ type: FirebaseAuthSagaActions.SIGN_OUT });
  },
  createUserWithEmailAndPassword: (
    email: string,
    password: string,
    displayName: string
  ) => {
    dispatch({
      type: FirebaseAuthSagaActions.EMAIL_PASSWORD_SIGN_UP,
      payload: {
        email,
        password,
        displayName,
      },
    });
  },
  fetchSections: () => {
    dispatch({
      type: FirebaseStoreSagaActions.FETCH_SECTIONS,
    });
  },
  fetchCollections: () => {
    dispatch({
      type: FirebaseStoreSagaActions.FETCH_COLLECTIONS,
    });
  },
});
