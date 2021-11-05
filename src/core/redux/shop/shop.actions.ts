import { ICollectionData } from "../../../models";
import { ShopReducerAction } from "./shop.types";

export const setCollections = (
  collections: ICollectionData
): ShopReducerAction<"FETCH_COLLECTIONS", ICollectionData> => ({
  type: "FETCH_COLLECTIONS",
  payload: collections,
});
