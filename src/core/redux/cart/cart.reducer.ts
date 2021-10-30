import {
  CartActionTypes,
  CartPayloadType,
  CartReducerAction,
  CartReducerManagedState,
} from "./cart.types";

import { Reducer } from "../redux.types";
import { addItemToCart } from "./cart.utils";

export const CART_INITIAL_STATE: CartReducerManagedState = {
  cartOpen: false,
  cartItems: [],
};

export const cartReducer: Reducer<
  CartReducerManagedState,
  CartReducerAction<CartActionTypes, CartPayloadType>
> = (state = CART_INITIAL_STATE, action) => {
  switch (action.type) {
    case "TOGGLE_CART":
      return { ...state, cartOpen: !state.cartOpen };
    case "ADD_ITEM":
      return addItemToCart(state, action.payload);
    default:
      return state;
  }
};
