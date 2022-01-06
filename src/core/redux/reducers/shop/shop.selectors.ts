import { RootState } from "../../";
import { createSelector } from "reselect";

const selectShop = (state: RootState) => state.shop;

export const selectShopCollections = createSelector(
  [selectShop],
  (shop: RootState["shop"]) => shop.collections
);

export const selectCollectionParam = (
  _state: RootState,
  collectionId: string
) => collectionId;

export const selectCollection = createSelector(
  [selectShopCollections, selectCollectionParam],
  (collections: RootState["shop"]["collections"], collectionId: string) => {
    return collections && collections[collectionId];
  }
);
