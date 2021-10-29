import { ReducerManagedState, ReducerAction } from "./user.types";

const INITIAL_STATE = {
  currentUser: undefined,
};

export const userReducer: any = (
  state: ReducerManagedState = INITIAL_STATE,
  action: ReducerAction
): ReducerManagedState => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
