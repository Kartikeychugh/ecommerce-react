import { UserReducerAction, UserReducerManagedState } from "./user.types";
import { setUser, updateUserProfile } from "./user.utils";

import { Reducer } from "react";

const INITIAL_STATE = {
  user: undefined,
  logging: false,
};

export const userReducer: Reducer<UserReducerManagedState, UserReducerAction> =
  (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "USER_SESSION_START":
        return setUser(state, action.payload);
      case "USER_SESSION_END":
        return setUser(state, action.payload);
      case "USER_PROFILE_UPDATE":
        return updateUserProfile(state, action.payload);
      default:
        return state;
    }
  };
