import { DirectoryReducerAction } from "./directory.types";
import { ISection } from "../../../../models";
import { ReducerThunk } from "../../redux.types";

export const fetchSectionsStart = (): DirectoryReducerAction => {
  return {
    type: "FETCH_SECTIONS_START",
  };
};

export const fetchSectionsAsync = (): ReducerThunk => {
  return async (dispatch, _getState, { firebaseStoreService }) => {
    dispatch(fetchSectionsStart());
    firebaseStoreService.getDocuments("directory", "order").then((res) => {
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
