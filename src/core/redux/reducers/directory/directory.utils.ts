import { DirectoryReducerManagedState } from ".";
import { DirectoryReducerStateManagers } from "./directory.types";

export const postSections: DirectoryReducerStateManagers = (
  state,
  payload: DirectoryReducerManagedState["sections"] | undefined
) => {
  if (!payload) {
    return { ...state, isFetching: false };
  }

  return { ...state, sections: payload, isFetching: false };
};
