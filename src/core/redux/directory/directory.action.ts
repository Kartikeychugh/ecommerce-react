import { DirectoryReducerAction } from "./directory.types";

export const fetchSections = (): DirectoryReducerAction<
  "FETCH_SECTIONS",
  null
> => {
  return {
    type: "FETCH_SECTIONS",
    payload: null,
  };
};
