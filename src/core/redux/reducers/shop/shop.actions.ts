import { ICollectionData } from "../../../../models";
import { ReducerThunk } from "../../redux.types";
import { ShopReducerAction } from "./shop.types";

export const fetchCollectionsStart = (): ShopReducerAction => ({
  type: "FETCH_COLLECTIONS_START",
});

export const fetchCollectionsSuccess = (
  payload: ICollectionData
): ShopReducerAction => ({
  type: "FETCH_COLLECTIONS_SUCCESS",
  payload,
});

export const fetchCollectionsAsync = (): ReducerThunk => {
  return async (dispatch, _getState, { firebaseStoreService }) => {
    dispatch(fetchCollectionsStart());
    firebaseStoreService
      .getDocuments("collections")
      .then((storeCollections) => {
        const collections: ICollectionData = {};

        Object.keys(storeCollections).forEach((key) => {
          collections[key] = {
            ...storeCollections[key],
            id: key,
          };
        });

        dispatch(fetchCollectionsSuccess(collections));
      });
  };
};
