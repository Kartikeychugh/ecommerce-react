import { ICollectionData } from "../../../../models";
import { ShopReducerAction } from "./shop.types";

export const fetchCollectionsSuccess = (
  payload: ICollectionData
): ShopReducerAction => ({
  type: "FETCH_COLLECTIONS_SUCCESS",
  payload,
});
