import {
  FirebaseAuthService,
  FirebaseContext,
  FirebaseStoreService,
  IFirebaseAuthService,
  IFirebaseStoreService,
} from "../../firebase";

import { GoogleAuthProvider } from "@firebase/auth";

export interface IFirebaseServices {
  firebaseStoreService: IFirebaseStoreService;
  firebaseAuthService: IFirebaseAuthService;
}
export interface IServices {
  firebase: IFirebaseServices;
}

export const getServices = (firebaseContext: FirebaseContext): IServices => {
  return {
    firebase: {
      firebaseStoreService: new FirebaseStoreService(
        firebaseContext.firebaseStore
      ),
      firebaseAuthService: new FirebaseAuthService(
        firebaseContext.firebaseAuth,
        new GoogleAuthProvider()
      ),
    },
  };
};
