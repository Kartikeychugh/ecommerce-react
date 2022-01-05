import { Action, Dispatch } from "redux";
import { CartItem, ICollectionItem } from "../../../../models";

export const CartActions = (dispatch: Dispatch<Action<any>>) => {
  return {
    toggleCart: (cartOpen?: boolean) =>
      dispatch({
        type: "TOGGLE_CART",
        payload: cartOpen !== undefined ? cartOpen : null,
      }),
    addToCart: (item: ICollectionItem) =>
      dispatch({
        type: "ADD_ITEM",
        payload: item,
      }),
    reduceFromCart: (item: CartItem) =>
      dispatch({
        type: "REDUCE_ITEM",
        payload: item,
      }),
    removeFromCart: (item: CartItem) =>
      dispatch({
        type: "REMOVE_ITEM",
        payload: item,
      }),
  };
};
