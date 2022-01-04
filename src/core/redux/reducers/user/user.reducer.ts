import { UserReducerAction, UserReducerManagedState } from "./user.types";
import { setUser, updateUserProfile } from "./user.utils";

import { Reducer } from "react";

const INITIAL_STATE = {
  user: null,
  logging: false,
};

export const userReducer: Reducer<UserReducerManagedState, UserReducerAction> =
  (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "USER_SESSION_CHANGE_INITIATE":
        return { ...state, logging: true };
      case "USER_SESSION_CHANGE_COMPLETE":
        return { ...state, logging: false };
      case "USER_SESSION_STARTED":
        return setUser(state, action.payload);
      case "USER_SESSION_ENDED":
        return setUser(state, action.payload);
      case "USER_PROFILE_UPDATE":
        return updateUserProfile(state, action.payload);
      default:
        return state;
    }
  };
