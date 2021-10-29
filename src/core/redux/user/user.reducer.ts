import { ReducerManagedState, ReducerAction } from "./types";

const INITIAL_STATE = {
  currentUser: undefined,
};

export const userReducer = (
  state: ReducerManagedState = INITIAL_STATE,
  action: ReducerAction
): ReducerManagedState => {
  switch (action.type) {
    case "SET_CURRENT_USER":
    case "SET_CURRENT_USER_DISPLAYNAME":
      return {
        ...state,
        currentUser: action.payload,
      };

    default:
      return state;
  }
};
