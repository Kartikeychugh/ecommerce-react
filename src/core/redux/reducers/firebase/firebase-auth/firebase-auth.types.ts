import { Action } from "../../../redux.types";

export const FirebaseAuthSagaActions: {
  GOOGLE_SIGN_IN: FirebaseAuthSagaActionType;
  EMAIL_PASSWORD_SIGN_IN: FirebaseAuthSagaActionType;
  EMAIL_PASSWORD_SIGN_UP: FirebaseAuthSagaActionType;
  SIGN_OUT: FirebaseAuthSagaActionType;
} = {
  GOOGLE_SIGN_IN: "SAGA/FIREBASE_AUTH/GOOGLE_SIGN_IN",
  EMAIL_PASSWORD_SIGN_IN: "SAGA/FIREBASE_AUTH/EMAIL_PASSWORD_SIGN_IN",
  EMAIL_PASSWORD_SIGN_UP: "SAGA/FIREBASE_AUTH/EMAIL_PASSWORD_SIGN_UP",
  SIGN_OUT: "SAGA/FIREBASE_AUTH/SIGN_OUT",
};

export type FirebaseAuthSagaActionType =
  | "SAGA/FIREBASE_AUTH/GOOGLE_SIGN_IN"
  | "SAGA/FIREBASE_AUTH/EMAIL_PASSWORD_SIGN_IN"
  | "SAGA/FIREBASE_AUTH/EMAIL_PASSWORD_SIGN_UP"
  | "SAGA/FIREBASE_AUTH/SIGN_OUT";

export type FirebaseAuthSagaAction<P> = Action<FirebaseAuthSagaActionType, P>;
