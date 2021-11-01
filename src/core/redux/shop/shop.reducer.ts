import {
  ShopActionTypes,
  ShopPayloadType,
  ShopReducerAction,
  ShopReducerManagedState,
} from "./shop.types";

import { Reducer } from "react";
import { ShopData } from "../../../assests/data";

const INITIAL_STATE = {
  items: ShopData,
};

export const ShopReducer: Reducer<
  ShopReducerManagedState,
  ShopReducerAction<ShopActionTypes, ShopPayloadType>
> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return { ...state };
  }
};
