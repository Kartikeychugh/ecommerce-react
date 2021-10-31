import { CartItem, ICollectionItem } from "../../../models";

import { CartReducerAction } from "./cart.types";

export const toggleCart = (): CartReducerAction<"TOGGLE_CART", null> => {
  return {
    type: "TOGGLE_CART",
    payload: null,
  };
};

export const addToCart = (
  item: ICollectionItem
): CartReducerAction<"ADD_ITEM", ICollectionItem> => {
  return {
    type: "ADD_ITEM",
    payload: item,
  };
};

export const reduceFromCart = (
  item: CartItem
): CartReducerAction<"REDUCE_ITEM", CartItem> => {
  return {
    type: "REDUCE_ITEM",
    payload: item,
  };
};

export const removeFromCart = (
  item: CartItem
): CartReducerAction<"REMOVE_ITEM", CartItem> => {
  return {
    type: "REMOVE_ITEM",
    payload: item,
  };
};
