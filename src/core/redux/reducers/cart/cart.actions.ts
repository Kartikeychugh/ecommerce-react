import { CartItem, ICollectionItem } from "../../../../models";

import { CartReducerAction } from "./cart.types";

export const toggleCart = (cartOpen?: boolean): CartReducerAction => {
  return {
    type: "TOGGLE_CART",
    payload: cartOpen !== undefined ? cartOpen : null,
  };
};

export const addToCart = (item: ICollectionItem): CartReducerAction => {
  return {
    type: "ADD_ITEM",
    payload: item,
  };
};

export const reduceFromCart = (item: CartItem): CartReducerAction => {
  return {
    type: "REDUCE_ITEM",
    payload: item,
  };
};

export const removeFromCart = (item: CartItem): CartReducerAction => {
  return {
    type: "REMOVE_ITEM",
    payload: item,
  };
};
