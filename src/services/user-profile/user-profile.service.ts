import { firebaseAuth, User } from "./../../core/firebase";

export const updateProfile = (
  user: User,
  {
    displayName,
    photoURL: photoUrl,
  }: {
    displayName?: string | null | undefined;
    photoURL?: string | null | undefined;
  }
) => {
  return firebaseAuth.firebase_updateProfile(user, {
    displayName,
    photoURL: photoUrl,
  });
};
