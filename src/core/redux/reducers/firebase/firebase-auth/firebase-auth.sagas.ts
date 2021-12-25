import {
  FirebaseAuthSagaAction,
  FirebaseAuthSagaActions,
} from "./firebase-auth.types";
import { put, takeLeading } from "redux-saga/effects";

import { IFirebaseAuthService } from "../../../..";
import { UserAction } from "../../user/user.action";
import { updateProfile } from "@firebase/auth";

export const initFirebaseAuthSaga = (
  firebaseAuthService: IFirebaseAuthService
) => {
  const createTakeLeadingWatcher = (
    pattern: string,
    generator: (...arg: any[]) => Generator<any>
  ) => {
    function* watcher() {
      yield takeLeading<string, typeof generator>(pattern, generator);
    }

    return watcher;
  };

  const watchSignOut = createTakeLeadingWatcher(
    FirebaseAuthSagaActions.SIGN_OUT,
    signOutGenerator(firebaseAuthService)
  );

  const watchSignInWithGooglePopup = createTakeLeadingWatcher(
    FirebaseAuthSagaActions.GOOGLE_SIGN_IN,
    signInWithGooglePopupGenerator(firebaseAuthService)
  );

  const watchSignInWithEmailAndPassword = createTakeLeadingWatcher(
    FirebaseAuthSagaActions.EMAIL_PASSWORD_SIGN_IN,
    signInWithEmailAndPasswordGenerator(firebaseAuthService)
  );

  const watchCreateUserWithEmailAndPassword = createTakeLeadingWatcher(
    FirebaseAuthSagaActions.EMAIL_PASSWORD_SIGN_UP,
    createUserWithEmailAndPasswordGenerator(firebaseAuthService)
  );

  return [
    watchSignOut(),
    watchSignInWithGooglePopup(),
    watchSignInWithEmailAndPassword(),
    watchCreateUserWithEmailAndPassword(),
  ];
};

const signOutGenerator = (firebaseAuthService: IFirebaseAuthService) =>
  function* signOut() {
    try {
      yield firebaseAuthService.signOut();
    } catch (e) {
      console.log(e);
    }
  };

const signInWithGooglePopupGenerator = (
  firebaseAuthService: IFirebaseAuthService
) =>
  function* signInWithGooglePopup() {
    try {
      yield firebaseAuthService.signInWithGooglePopup();
    } catch (e) {
      console.log(e);
    }
  };

const signInWithEmailAndPasswordGenerator = (
  firebaseAuthService: IFirebaseAuthService
) =>
  function* signInWithEmailAndPassword(
    action: FirebaseAuthSagaAction<{ email: string; password: string }>
  ) {
    try {
      yield firebaseAuthService.signInWithEmailAndPassword(
        action.payload.email,
        action.payload.password
      );
    } catch (e) {
      console.log(e);
    }
  };

const createUserWithEmailAndPasswordGenerator = (
  firebaseAuthService: IFirebaseAuthService
) =>
  function* createUserWithEmailAndPassword(
    action: FirebaseAuthSagaAction<{
      email: string;
      password: string;
      displayName: string;
    }>
  ) {
    try {
      const { user } = yield firebaseAuthService.createUserWithEmailAndPassword(
        action.payload.email,
        action.payload.password,
        action.payload.displayName
      );

      yield updateProfile(user, { displayName: action.payload.displayName });
      yield put(UserAction().userProfileUpdate(action.payload.displayName));
    } catch (e) {
      console.log(e);
    }
  };
