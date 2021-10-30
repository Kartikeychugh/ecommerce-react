import {
  UserActionTypes,
  UserPayloadType,
  UserReducerAction,
  UserReducerManagedState,
} from "./user.types";

import { Reducer } from "../redux.types";

export const USER_INITIAL_STATE: UserReducerManagedState = {
  currentUser: undefined,
};

export const userReducer: Reducer<
  UserReducerManagedState,
  UserReducerAction<UserActionTypes, UserPayloadType>
> = (state = USER_INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return { ...state, ...{ currentUser: action.payload } };

    default:
      return state;
  }
};
