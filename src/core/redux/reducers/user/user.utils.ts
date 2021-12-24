import {
  UserReducerManagedState,
  UserReducerStateManagers,
} from "./user.types";

import { CurrentUser } from "../../../firebase";

export const setUser: UserReducerStateManagers = (state, payload) => {
  return { ...state, user: payload as CurrentUser };
};

export const updateUserProfile: UserReducerStateManagers = (
  state: UserReducerManagedState,
  payload
) => {
  return {
    ...state,
    user: { ...state.user, displayName: payload },
  } as UserReducerManagedState;
};
