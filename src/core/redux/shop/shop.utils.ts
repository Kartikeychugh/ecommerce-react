import { ShopReducerStateManagers } from "./shop.types";

export const addCollections: ShopReducerStateManagers = (state, payload) => {
  return {
    ...state,
    isFetching: false,
    ...(payload ? { collections: payload } : {}),
  };
};
