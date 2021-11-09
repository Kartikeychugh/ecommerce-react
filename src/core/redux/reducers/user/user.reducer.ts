import { UserReducer, UserReducerManagedState } from "./user.types";

export const USER_INITIAL_STATE: UserReducerManagedState = {
  currentUser: undefined,
};

export const userReducer: UserReducer = (
  state = USER_INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return { ...state, ...{ currentUser: action.payload } };

    default:
      return state;
  }
};
