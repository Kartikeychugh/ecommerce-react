import { firebaseAuth } from "../../core/firebase";

export const signInWithGooglePopUp = () => {
  return firebaseAuth.firebase_signInWithGooglePopup();
};
