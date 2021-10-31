import { CartItem, ICollectionItem } from "../../../models";

export type CartActionTypes =
  | "TOGGLE_CART"
  | "ADD_ITEM"
  | "REMOVE_ITEM"
  | "REDUCE_ITEM";
export type CartPayloadType = null | ICollectionItem;

export type CartReducerManagedState = {
  cartOpen: boolean;
  cartItems: CartItem[];
};

export type CartReducerAction<
  T extends CartActionTypes,
  P extends CartPayloadType
> = {
  type: T;
  payload: P;
};

export type UserReducerStateManagers = (
  prevState: CartReducerManagedState,
  payload: CartPayloadType
) => CartReducerManagedState;
