import {
  EmailAuthProvider,
  GoogleAuthProvider,
  updateProfile,
} from "@firebase/auth";

import { CurrentUser } from "../../../firebase";
import { ReducerThunk } from "../../redux.types";
import { UserReducerAction } from "./user.types";

export const signInStart = (): UserReducerAction => {
  return {
    type: "FETCH_USER_START",
  };
};

export const signInSuccess = (): UserReducerAction => {
  return {
    type: "FETCH_USER_SUCCESS",
  };
};

export const signInAsync = (
  providerId:
    | typeof GoogleAuthProvider.PROVIDER_ID
    | typeof EmailAuthProvider.PROVIDER_ID,
  email: string = "",
  password: string = "",
  displayName: string = ""
): ReducerThunk => {
  return async (dispatch, _getState, { firebaseAuthService }) => {
    dispatch(signInStart());
    switch (providerId) {
      case "google.com":
        await firebaseAuthService.signInWithGooglePopup();
        break;
      case "password":
        const { user } =
          await firebaseAuthService.createUserWithEmailAndPassword(
            email,
            password,
            displayName
          );
        await updateProfile(user, { displayName });
        dispatch(updateUserProfile({ displayName }));
        break;
    }

    dispatch(signInSuccess());
  };
};

export const setUser = (payload: CurrentUser): UserReducerAction => {
  return {
    type: "SET_USER",
    payload,
  };
};

export const updateUserProfile = (payload: {
  displayName: string;
}): UserReducerAction => {
  return {
    type: "UPDATE_USER_PROFILE",
    payload,
  };
};

export const signOut = (): ReducerThunk => {
  return async (_dispatch, _getState, { firebaseAuthService }) => {
    firebaseAuthService.signOut();
  };
};

export const signInWithEmailAndPassword = (
  email: string,
  password: string
): ReducerThunk => {
  return async (_dispatch, _getState, { firebaseAuthService }) => {
    firebaseAuthService.signInWithEmailAndPassword(email, password);
  };
};
