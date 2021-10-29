import { combineReducers } from "redux";
import { userReducer } from "./user";
import { ReducerManagedState as UserReducerManagedState } from "./user/types";

export type RootState = {
  user: UserReducerManagedState;
};

export default combineReducers({ user: userReducer });
