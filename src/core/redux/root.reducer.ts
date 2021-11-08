import { AnyAction, combineReducers } from "redux";

import { RootState } from "./redux.types";
import { ShopReducer } from "./shop";
import { cartReducer } from "./cart";
import { directoryReducer } from "./directory";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userReducer } from "./user";

const config = {
  key: "root",
  whitelist: ["cart", "directory", "shop"],
  storage,
};

const rootReducer = combineReducers<RootState | {}, AnyAction>({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: ShopReducer,
});

export const reducer = persistReducer(config, rootReducer);
