import { CurrentUser, UserProfileData } from "../../../firebase";

export type UserReducerManagedState = {
  user: CurrentUser;
  logging: boolean;
};

export type UserActionTypes =
  | "USER_SESSION_STARTED"
  | "USER_SESSION_ENDED"
  | "USER_PROFILE_UPDATE"
  | "USER_SESSION_CHANGE_INITIATE"
  | "USER_SESSION_CHANGE_COMPLETE";

export type UserPayloadType = CurrentUser | UserProfileData;

export type UserReducerAction = {
  type: UserActionTypes;
  payload?: UserPayloadType;
};

export type UserReducerStateManagers = (
  prevState: UserReducerManagedState,
  payload?: UserPayloadType
) => UserReducerManagedState;
