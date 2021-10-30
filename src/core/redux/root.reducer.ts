import { combineReducers } from "redux";
import { userReducer } from "./user";
import { UserReducerManagedState } from "./user/user.types";
import { CartReducerManagedState } from "./cart/cart.types";
import { cartReducer } from "./cart/cart.reducer";

export type RootState = {
  user: UserReducerManagedState;
  cart: CartReducerManagedState;
};

export default combineReducers({ user: userReducer, cart: cartReducer });
