import { firebaseAuth } from "./../../core/firebase";
import { updateProfile } from "../user-profile/user-profile.service";

export const createUserWithEmailAndPassword = (
  email: string,
  password: string,
  displayName: string
) => {
  return firebaseAuth
    .firebase_createUserWithEmailAndPassword(email, password)
    .then(async (userCredential) => {
      await updateProfile(userCredential.user, { displayName });
      return userCredential;
    });
};

export const signInWithEmailAndPassword = (email: string, password: string) => {
  return firebaseAuth.firebase_signInWithEmailAndPassword(email, password);
};
