import {
  Auth as _Auth,
  GoogleAuthProvider as _GoogleAuthProvider,
  Unsubscribe as _Unsubscribe,
  User as _User,
} from "firebase/auth";

export interface IUser {
  displayName: string;
  email: string;
  createdAt: string;
  id: string;
}

/**
 * IUser: Logged-in
 * null: Logged-out or not signed-in yet
 * undefined: We don't know the status
 */
export type CurrentUser = IUser | null | undefined;
export type User = _User;
export type Unsubscribe = _Unsubscribe;
export type Auth = _Auth;
export type GoogleAuthProvider = _GoogleAuthProvider;
