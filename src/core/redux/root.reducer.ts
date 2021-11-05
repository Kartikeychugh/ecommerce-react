import { CartReducerManagedState, cartReducer } from "./cart";
import { DirectoryReducerManagedState, directoryReducer } from "./directory";
import { Reducer, combineReducers } from "redux";
import { ShopReducer, ShopReducerManagedState } from "./shop";
import { UserReducerManagedState, userReducer } from "./user";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export type RootState = {
  user: UserReducerManagedState;
  cart: CartReducerManagedState;
  directory: DirectoryReducerManagedState;
  shop: ShopReducerManagedState;
};

const config = {
  key: "root",
  whitelist: ["cart", "directory"],
  storage,
};

const rootReducer: Reducer<RootState> = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: ShopReducer,
}) as any;

export const reducer = persistReducer(config, rootReducer);
