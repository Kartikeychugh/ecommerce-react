import {
  FirebaseAuthSagaAction,
  FirebaseAuthSagaActions,
} from "./firebase-auth.types";
import { put, takeLeading } from "redux-saga/effects";

import { IFirebaseAuthService } from "../../../..";
import { UserAction } from "../../user/user.action";
import { updateProfile } from "@firebase/auth";

const createTakeLeadingWatcher = (
  pattern: string,
  generator: (...arg: any[]) => Generator<any>
) => {
  function* watcher() {
    yield takeLeading<string, typeof generator>(pattern, generator);
  }

  return watcher;
};

export const initFirebaseAuthSaga = (
  firebaseAuthService: IFirebaseAuthService
) => {
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
      // yield put({ type: "USER_SESSION_ENDED", payload: null });
    } catch (e) {
      console.log(e);
    }
  };

const signInWithGooglePopupGenerator = (
  firebaseAuthService: IFirebaseAuthService
) =>
  function* signInWithGooglePopup() {
    yield put(UserAction().userSessionStartInitiate());
    try {
      yield firebaseAuthService.signInWithGooglePopup();
      // const { user }: UserCredential =
      //   yield firebaseAuthService.signInWithGooglePopup();

      // yield put({ type: "USER_SESSION_STARTED", payload: user });
    } catch (e) {
      console.log(e);
    }
    yield put(UserAction().userSessionStartComplete());
  };

const signInWithEmailAndPasswordGenerator = (
  firebaseAuthService: IFirebaseAuthService
) =>
  function* signInWithEmailAndPassword(
    action: FirebaseAuthSagaAction<{ email: string; password: string }>
  ) {
    yield put(UserAction().userSessionStartInitiate());
    try {
      yield firebaseAuthService.signInWithEmailAndPassword(
        action.payload.email,
        action.payload.password
      );
      // const { user }: UserCredential =
      //   yield firebaseAuthService.signInWithEmailAndPassword(
      //     action.payload.email,
      //     action.payload.password
      //   );
      // yield put({ type: "USER_SESSION_STARTED", payload: user });
    } catch (e) {
      console.log(e);
    }
    yield put(UserAction().userSessionStartComplete());
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
    yield put(UserAction().userSessionStartInitiate());
    try {
      const { user } = yield firebaseAuthService.createUserWithEmailAndPassword(
        action.payload.email,
        action.payload.password,
        action.payload.displayName
      );

      yield updateProfile(user, { displayName: action.payload.displayName });
      // yield put({ type: "USER_SESSION_STARTED", payload: user });
      yield put(UserAction().userProfileUpdate(action.payload.displayName));
    } catch (e) {
      console.log(e);
    }
    yield put(UserAction().userSessionStartComplete());
  };
