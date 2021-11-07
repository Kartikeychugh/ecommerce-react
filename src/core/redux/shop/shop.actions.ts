import { ICollectionData } from "../../../models";
import { ShopReducerAction } from "./shop.types";

export const setCollections = (
  collections: ICollectionData
): ShopReducerAction => ({
  type: "FETCH_COLLECTIONS",
  payload: collections,
});
