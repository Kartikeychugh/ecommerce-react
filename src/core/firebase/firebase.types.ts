import { User } from "firebase/auth";

export type CurrentUser = User | null | undefined;
export type UserProfileData = {
  displayName?: string | null | undefined;
  photoURL?: string | null | undefined;
};
