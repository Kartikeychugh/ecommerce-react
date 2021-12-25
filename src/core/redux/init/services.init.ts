import {
  FirebaseAuthService,
  FirebaseContext,
  FirebaseStoreService,
  IFirebaseAuthService,
  IFirebaseStoreService,
} from "../../firebase";

import { GoogleAuthProvider } from "@firebase/auth";

export interface IServices {
  firebaseStoreService: IFirebaseStoreService;
  firebaseAuthService: IFirebaseAuthService;
}

export const getServices = (firebaseContext: FirebaseContext): IServices => {
  return {
    firebaseStoreService: new FirebaseStoreService(
      firebaseContext.firebaseStore
    ),
    firebaseAuthService: new FirebaseAuthService(
      firebaseContext.firebaseAuth,
      new GoogleAuthProvider()
    ),
  };
};
