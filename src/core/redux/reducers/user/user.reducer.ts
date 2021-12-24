import { UserReducerAction, UserReducerManagedState } from "./user.types";
import { setUser, updateUserProfile } from "./user.utils";

import { Reducer } from "react";

const INITIAL_STATE = {
  user: undefined,
  isFetching: false,
};

export const userReducer: Reducer<UserReducerManagedState, UserReducerAction> =
  (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "FETCH_USER_START":
        return { ...state, isFetching: true };
      case "FETCH_USER_SUCCESS":
        return { ...state, isFetching: false };
      case "SET_USER":
        return setUser(state, action.payload);
      case "UPDATE_USER_PROFILE":
        return updateUserProfile(state, action.payload);
      default:
        return state;
    }
  };
