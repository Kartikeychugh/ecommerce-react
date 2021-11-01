import {} from "./user";

import { CartReducerManagedState, cartReducer } from "./cart";
import { Reducer, combineReducers } from "redux";
import { UserReducerManagedState, userReducer } from "./user";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export type RootState = {
  user: UserReducerManagedState;
  cart: CartReducerManagedState;
};

const config = {
  key: "root",
  whitelist: ["cart"],
  storage,
};

const rootReducer: Reducer<RootState> = combineReducers({
  user: userReducer,
  cart: cartReducer,
}) as any;

export const reducer = persistReducer(config, rootReducer);
