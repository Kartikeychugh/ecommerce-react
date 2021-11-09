import { CurrentUser } from "../../../../models";
import { Reducer } from "../../redux.types";

export type UserReducerManagedState = { currentUser: CurrentUser };

export type UserReducerAction = {
  type: UserActionTypes;
  payload: UserPayloadType;
};

export type UserActionTypes = "SET_CURRENT_USER";
export type UserPayloadType = CurrentUser;
export type UserReducer = Reducer<UserReducerManagedState, UserReducerAction>;
