import { RootState } from "..";
import { createSelector } from "reselect";

const selectShop = (state: RootState) => state.shop;

export const selectShopItems = createSelector(
  [selectShop],
  (shop: RootState["shop"]) => shop.items
);
