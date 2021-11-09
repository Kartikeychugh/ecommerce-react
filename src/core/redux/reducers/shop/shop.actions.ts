import {
  DocumentData,
  Firestore,
  QueryDocumentSnapshot,
  collection,
  getDocs,
  query,
} from "@firebase/firestore";

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

export const fetchCollectionsAsync = (
  firebaseStore: Firestore
): ReducerThunk => {
  return async (dispatch, _getState) => {
    dispatch(fetchCollectionsStart());
    getDocs(query(collection(firebaseStore, "collections")))
      .then((querySnapshot) => {
        const docs = querySnapshot.docs;
        const res: { [key: string]: any } = {};

        docs.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
          const data = doc.data();
          res[doc.id] = data;
        });
        return res;
      })
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
