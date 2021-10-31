import {} from "./user";

import { CartReducerManagedState, cartReducer } from "./cart";
import { Reducer, combineReducers } from "redux";
import { UserReducerManagedState, userReducer } from "./user";

export type RootState = {
  user: UserReducerManagedState;
  cart: CartReducerManagedState;
};

export const rootReducer: Reducer<RootState> = combineReducers({
  user: userReducer,
  cart: cartReducer,
}) as any;
