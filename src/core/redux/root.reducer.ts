import { AnyAction, combineReducers } from "redux";

import { RootState } from "./redux.types";
import { ShopReducer } from "./reducers/shop";
import { cartReducer } from "./reducers/cart";
import { directoryReducer } from "./reducers/directory";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userReducer } from "./reducers/user";

const config = {
  key: "root",
  whitelist: ["cart", "directory", "shop"],
  storage,
};

const rootReducer = combineReducers<RootState | {}, AnyAction>({
  cart: cartReducer,
  directory: directoryReducer,
  shop: ShopReducer,
  user: userReducer,
});

export const reducer = persistReducer(config, rootReducer);
