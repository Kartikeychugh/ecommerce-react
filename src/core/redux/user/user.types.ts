import { CurrentUser } from "../../../models";

export type UserReducerManagedState = { currentUser: CurrentUser };

export type UserReducerAction<
  T extends UserActionTypes,
  P extends UserPayloadType
> = {
  type: T;
  payload: P;
};

export type UserActionTypes = "SET_CURRENT_USER";
export type UserPayloadType = CurrentUser;
