import { ShopReducerAction, ShopReducerManagedState } from "./shop.types";

import { Reducer } from "react";
import { addCollections } from "./shop.utils";

const INITIAL_STATE = {
  collections: null,
};

export const ShopReducer: Reducer<ShopReducerManagedState, ShopReducerAction> =
  (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "FETCH_COLLECTIONS":
        return addCollections(state, action.payload);
      default:
        return state;
    }
  };
