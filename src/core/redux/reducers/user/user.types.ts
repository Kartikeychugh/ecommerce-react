import { CurrentUser, UserProfileData } from "../../../firebase";

export type UserReducerManagedState = {
  user: CurrentUser;
  isFetching: boolean;
};

export type UserActionTypes =
  | "FETCH_USER_START"
  | "FETCH_USER_SUCCESS"
  | "SET_USER"
  | "SIGN_OUT"
  | "UPDATE_USER_PROFILE";

export type UserPayloadType = CurrentUser | UserProfileData;

export type UserReducerAction = {
  type: UserActionTypes;
  payload?: UserPayloadType;
};

export type UserReducerStateManagers = (
  prevState: UserReducerManagedState,
  payload?: UserPayloadType
) => UserReducerManagedState;
