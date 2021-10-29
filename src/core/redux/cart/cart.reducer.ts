import { ReducerAction, ReducerManagedState } from "./cart.types";

const INITIAL_STATE = {
  cartOpen: false,
};

export const cartReducer = (
  state: ReducerManagedState = INITIAL_STATE,
  action: ReducerAction
): ReducerManagedState => {
  switch (action.type) {
    case "TOGGLE_CART":
      return { ...state, cartOpen: !state.cartOpen };
    default:
      return state;
  }
};
