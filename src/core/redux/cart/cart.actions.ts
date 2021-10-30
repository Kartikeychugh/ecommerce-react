import { ICollectionItem } from "../../../models";
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
