import { DirectoryReducerStateManagers } from "./directory.types";

export const postSections: DirectoryReducerStateManagers = (state, payload) => {
  if (!payload) {
    return { ...state };
  }

  return { ...state, sections: payload };
};
