import { ShopReducerStateManagers } from "./shop.types";

export const addCollections: ShopReducerStateManagers = (state, payload) => {
  return { ...state, collections: payload };
};
