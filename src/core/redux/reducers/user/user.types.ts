import { CurrentUser, UserProfileData } from "../../../firebase";

export type UserReducerManagedState = {
  user: CurrentUser;
  logging: boolean;
};

export type UserActionTypes =
  | "USER_SESSION_START"
  | "USER_SESSION_END"
  | "USER_PROFILE_UPDATE";

export type UserPayloadType = CurrentUser | UserProfileData;

export type UserReducerAction = {
  type: UserActionTypes;
  payload?: UserPayloadType;
};

export type UserReducerStateManagers = (
  prevState: UserReducerManagedState,
  payload?: UserPayloadType
) => UserReducerManagedState;
