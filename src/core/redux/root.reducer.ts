import {} from "./user";

import { CartReducerManagedState, cartReducer } from "./cart";
import { Reducer, combineReducers } from "redux";
import { UserReducerManagedState, userReducer } from "./user";

import { DirectoryReducerManagedState } from "./directory/directory.types";
import { ShopReducer } from "./shop";
import { ShopReducerManagedState } from "./shop/shop.types";
import { directoryReducer } from "./directory";
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
  whitelist: ["cart", "directory", "shop"],
  storage,
};

const rootReducer: Reducer<RootState> = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: ShopReducer,
}) as any;

export const reducer = persistReducer(config, rootReducer);
