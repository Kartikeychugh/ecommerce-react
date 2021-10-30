import { Reducer } from "../redux.types";
import {
  UserActionTypes,
  UserPayloadType,
  UserReducerAction,
  UserReducerManagedState,
} from "./user.types";

const INITIAL_STATE = {
  currentUser: undefined,
};

export const userReducer: Reducer<
  UserReducerManagedState,
  UserReducerAction<UserActionTypes, UserPayloadType>
> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return { ...state, ...{ currentUser: action.payload } };

    default:
      return state;
  }
};
