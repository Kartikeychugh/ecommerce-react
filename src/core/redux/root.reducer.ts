import {} from "./user";

import { CartReducerManagedState, cartReducer } from "./cart";
import { UserReducerManagedState, userReducer } from "./user";

import { combineReducers } from "redux";

export type RootState = {
  user: UserReducerManagedState;
  cart: CartReducerManagedState;
};

export const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});
