import { RootState } from "..";
import { createSelector } from "reselect";

const selectShop = (state: RootState) => state.shop;

export const selectShopCollections = createSelector(
  [selectShop],
  (shop: RootState["shop"]) => shop.collections
);

export const selectCollection = (collectionUrlParam: string) =>
  createSelector(
    [selectShopCollections],
    (collections: RootState["shop"]["collections"]) => {
      return collections && collections[collectionUrlParam];
    }
  );
