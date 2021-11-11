import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  getDocs,
  orderBy,
  query,
} from "@firebase/firestore";

import { DirectoryReducerAction } from "./directory.types";
import { ISection } from "../../../../models";
import { ReducerThunk } from "../../redux.types";

export const fetchSectionsStart = (): DirectoryReducerAction => {
  return {
    type: "FETCH_SECTIONS_START",
  };
};

export const fetchSectionsAsync = (): ReducerThunk => {
  return async (dispatch, _getState, extraArgs) => {
    dispatch(fetchSectionsStart());
    getDocs(
      query(collection(extraArgs.firebaseStore, "directory"), orderBy("order"))
    )
      .then((querySnapshot) => {
        const docs = querySnapshot.docs;
        const res: { [key: string]: any } = {};

        docs.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
          const data = doc.data();
          res[doc.id] = data;
        });
        return res;
      })
      .then((res) => {
        const sections: ISection[] = [];

        Object.keys(res).forEach((key) => {
          const section = { ...res[key], id: key };
          sections.push(section);
        });

        dispatch(fetchSectionsSuccess(sections));
      });
  };
};

export const fetchSectionsSuccess = (
  payload: ISection[]
): DirectoryReducerAction => {
  return {
    type: "FETCH_SECTIONS_SUCCESS",
    payload,
  };
};
