import { Reducer } from "../redux.types";
import {
  CartActionTypes,
  CartPayloadType,
  CartReducerAction,
  CartReducerManagedState,
} from "./cart.types";
import { addItemToCart } from "./cart.utils";

const INITIAL_STATE = {
  cartOpen: false,
  cartItems: [],
};

export const cartReducer: Reducer<
  CartReducerManagedState,
  CartReducerAction<CartActionTypes, CartPayloadType>
> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "TOGGLE_CART":
      return { ...state, cartOpen: !state.cartOpen };
    case "ADD_ITEM":
      return addItemToCart(state, action.payload);
    default:
      return state;
  }
};
