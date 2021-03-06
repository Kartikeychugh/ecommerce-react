import { CartReducerAction, CartReducerManagedState } from "./cart.types";
import {
  addItemToCart,
  reduceFromCart,
  removeFromCart,
  toggleCart,
} from "./cart.utils";

import { Reducer } from "../../redux.types";

export const CART_INITIAL_STATE: CartReducerManagedState = {
  cartOpen: false,
  cartItems: [],
};

export const cartReducer: Reducer<CartReducerManagedState, CartReducerAction> =
  (state = CART_INITIAL_STATE, action) => {
    switch (action.type) {
      case "TOGGLE_CART":
        return toggleCart(state, action.payload);
      case "ADD_ITEM":
        return addItemToCart(state, action.payload);
      case "REDUCE_ITEM":
        return reduceFromCart(state, action.payload);
      case "REMOVE_ITEM":
        return removeFromCart(state, action.payload);
      default:
        return state;
    }
  };
