import { CartItem, ICollectionItem } from "../../../models";

export type CartActionTypes =
  | "TOGGLE_CART"
  | "ADD_ITEM"
  | "REMOVE_ITEM"
  | "REDUCE_ITEM";
export type CartPayloadType = null | ICollectionItem | boolean;

export type CartReducerManagedState = {
  cartOpen: boolean;
  cartItems: CartItem[];
};

export type CartReducerAction = {
  type: CartActionTypes;
  payload: CartPayloadType;
};

export type UserReducerStateManagers = (
  prevState: CartReducerManagedState,
  payload: CartPayloadType
) => CartReducerManagedState;
